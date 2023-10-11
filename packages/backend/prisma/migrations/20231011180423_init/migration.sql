/*
  Warnings:

  - A unique constraint covering the columns `[marketId,collateralId]` on the table `Market` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Market_marketId_baseId_collateralId_key` ON `Market`;

-- CreateIndex
CREATE UNIQUE INDEX `Market_marketId_collateralId_key` ON `Market`(`marketId`, `collateralId`);
