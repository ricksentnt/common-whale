import { GraphQLClient, gql } from 'graphql-request'
import { COMPOUND_FINANCE_V3_SUBGRAPH } from '../../../configs.js'

export const CompoundV3GraphqlClient = new GraphQLClient(COMPOUND_FINANCE_V3_SUBGRAPH)

export const COMPOUND_V3_MARKETS = gql`
query Markets {
  markets(orderBy: id, orderDirection: asc) {
    id
    accounting {
      market{
        id
        dailyUsage(orderBy: timestamp, orderDirection: desc, first: 3) {
          day
          id
          timestamp
          usage {
            id
            interactionCount
            liquidationCount
            uniqueUsersCount
          }
        }
      }
    }
    configuration {
      symbol
      baseToken {
        id
        token {
          id
          address
          name
          symbol
          decimals
        }
      }
    }
    collateralBalances(orderBy: id, orderDirection: desc) {
      id
      reserves
      reservesUsd
      lastUpdateBlockNumber
      balanceUsd
      balance
      collateralToken {
        id
        token {
          id
          address
          name
          symbol
          decimals
        }
        liquidationFactor
        liquidateCollateralFactor
        priceFeed
        lastPriceUsd
      }
    }
  }
}
`