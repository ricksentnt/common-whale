import cron from 'node-cron';
import { fetchCompoundV3Markets } from './api/CompoundV3Subgraph.js'
import { prismaClient } from '../utils/prisma.js';

export const marketWorker = async (server) => {
  // run every 1s 
  cron.schedule('*/30 * * * * *', async () => {
    getCompoundFinanceV3Markets()
  });

  const getCompoundFinanceV3Markets = async () => {
    console.log('getCompoundFinanceV3Markets')

    const markets = await fetchCompoundV3Markets()

    for (const market of markets) {
      // Upsert Market
      await prismaClient.market.upsert({
        where: {
          marketId: market.id
        },
        create: {
          marketId: market.id,
          symbol: market.configuration.symbol,
          name: market.configuration.name,
        },
        update: {
          symbol: market.configuration.symbol,
          name: market.configuration.name,
        }
      })

      // Upsert Daily Usages
      const dailyUsage = market.accounting.market.dailyUsage
      for (const usage of dailyUsage) {
        await prismaClient.marketDailyUsage.upsert({
          where: {
            marketId_day: {
              marketId: market.id,
              day: usage.day
            }
          },
          create: {
            marketId: market.id,
            day: usage.day,
            timestamp: parseInt(usage.timestamp),
            interactionCount: parseInt(usage.usage.interactionCount),
            liquidationCount: parseInt(usage.usage.liquidationCount),
            uniqueUserCount: parseInt(usage.usage.uniqueUsersCount),
          },
          update: {
            timestamp: parseInt(usage.timestamp),
            interactionCount: parseInt(usage.usage.interactionCount),
            liquidationCount: parseInt(usage.usage.liquidationCount),
            uniqueUserCount: parseInt(usage.usage.uniqueUsersCount),
          }
        })
      }

      const tokens = []

      tokens.push(market.configuration.baseToken)
      const collateralTokens = market.collateralBalances.map(collateralBalance => collateralBalance.collateralToken);
      tokens.push(...collateralTokens);

      for (const token of tokens) {
        await prismaClient.token.upsert({
          where: {
            id: token.token.address,
          },
          create: {
            id: token.token.address,
            address: token.token.address,
            name: token.token.name,
            symbol: token.token.symbol,
            decimals: token.token.decimals,
            logo: `/assets/token/${token.token.address}.webp`
          },
          update: {
            address: token.token.address,
            name: token.token.name,
            symbol: token.token.symbol,
            decimals: token.token.decimals,
            logo: `/assets/token/${token.token.address}.webp`
          }
        })
      }

      // Upsert MarketCollateral
      for (const token of tokens) {
        // skip if token.token.address === market.configuration.baseToken.token.address
        if (token.token.address === market.configuration.baseToken.token.address) {
          continue
        }

        await prismaClient.marketCollateral.upsert({
          where: {
            marketId_collateralId: {
              marketId: market.id,
              collateralId: token.token.address,
            }
          },
          create: {
            marketId: market.id,
            collateralId: token.token.address,
            baseId: market.configuration.baseToken.id,
            baseAddress: market.configuration.baseToken.token.id,
            collateralAddress: token.token.address,
          },
          update: {
            baseId: market.configuration.baseToken.id,
            baseAddress: market.configuration.baseToken.token.id,
            collateralAddress: token.token.address,
          }
        }).catch(e => {
          console.log(e)
        })
      }

      const collateralBalances = market.collateralBalances

      // Upsert CollateralStats
      for (const collateralBalance of collateralBalances) {
        await prismaClient.collateralStats.upsert({
          where: {
            marketId_collateralId: {
              marketId: market.id,
              collateralId: collateralBalance.collateralToken.token.address
            }
          },
          create: {
            marketId: market.id,
            collateralId: collateralBalance.collateralToken.token.address,
            reserves: collateralBalance.reserves,
            reservesUsd: collateralBalance.reservesUsd,
            balance: collateralBalance.balance,
            balanceUsd: collateralBalance.balanceUsd,
            liquidationFactor: collateralBalance.collateralToken.liquidationFactor,
            liquidateCollateralFactor: collateralBalance.collateralToken.liquidateCollateralFactor,
            priceFeed: collateralBalance.collateralToken.priceFeed,
            lastPriceUsd: collateralBalance.collateralToken.lastPriceUsd,
            borrowCollateralFactor: collateralBalance.collateralToken.borrowCollateralFactor,
            supplyCap: collateralBalance.collateralToken.supplyCap
          },
          update: {
            reserves: collateralBalance.reserves,
            reservesUsd: collateralBalance.reservesUsd,
            balance: collateralBalance.balance,
            balanceUsd: collateralBalance.balanceUsd,
            liquidationFactor: collateralBalance.collateralToken.liquidationFactor,
            liquidateCollateralFactor: collateralBalance.collateralToken.liquidateCollateralFactor,
            priceFeed: collateralBalance.collateralToken.priceFeed,
            lastPriceUsd: collateralBalance.collateralToken.lastPriceUsd,
            borrowCollateralFactor: collateralBalance.collateralToken.borrowCollateralFactor,
            supplyCap: collateralBalance.collateralToken.supplyCap
          }
        }).catch(e => {
          console.log({
            market,
            collateralBalance
          })

          console.log(e)
        })
      }
    }

    console.log('getCompoundFinanceV3Markets done')
  }

  getCompoundFinanceV3Markets()

}