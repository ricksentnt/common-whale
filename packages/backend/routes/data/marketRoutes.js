import { prismaClient } from "../../utils/prisma.js"

export const marketRoutes = async (server) => {
  server.get('/markets', async (req, res) => {
    try {
      const markets = await prismaClient.marketCollateral.findMany({
        orderBy: {
          // marketId: 'asc'
          collateralStats: {
            reservesUsd: 'desc'
          }
        },
        include: {
          baseToken: true,
          collateralToken: true,
          collateralStats: true,
          market: {
            include: {
              dailyUsages: {
                orderBy: {
                  day: 'desc'
                },
                take: 3
              }
            }
          }
        }
      })

      res.send(markets)
    } catch (error) {
      console.log(error)
      return res.send({
        error: 'Something went wrong'
      })
    }
  })

  server.get('/market-stats', async (req, res) => {
    try {
      const summary = await prismaClient.marketDailyUsage.groupBy({
        by: ['day'],
        _sum: {
          interactionCount: true,
          liquidationCount: true,
          uniqueUserCount: true,
        },
        orderBy: {
          day: 'desc'
        },
        take: 1,
      });

      return res.send({
        ...summary[0]._sum,
        day: summary[0].day
      })
    } catch (error) {
      console.log(error)
      return res.send({
        error: 'Something went wrong'
      })
    }
  })
}