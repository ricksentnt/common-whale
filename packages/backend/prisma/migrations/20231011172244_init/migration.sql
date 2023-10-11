/*
  Warnings:

  - The primary key for the `Market` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[marketId,baseId,collateralId]` on the table `Market` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Market` DROP PRIMARY KEY;

-- CreateIndex
CREATE UNIQUE INDEX `Market_marketId_baseId_collateralId_key` ON `Market`(`marketId`, `baseId`, `collateralId`);
