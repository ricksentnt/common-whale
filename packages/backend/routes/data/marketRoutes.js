import { prismaClient } from "../../utils/prisma.js"

export const marketRoutes = async (server) => {
  server.get('/markets', async (req, res) => {
    const markets = await prismaClient.marketCollateral.findMany({
      orderBy: {
        marketId: 'asc'
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
  })


}