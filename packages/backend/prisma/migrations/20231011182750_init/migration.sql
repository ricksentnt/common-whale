/*
  Warnings:

  - You are about to drop the column `collateralAddress` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `collateralId` on the `Market` table. All the data in the column will be lost.
  - Added the required column `updatedAt_` to the `Market` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt_` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Market` DROP FOREIGN KEY `Market_baseId_fkey`;

-- DropForeignKey
ALTER TABLE `Market` DROP FOREIGN KEY `Market_collateralId_fkey`;

-- DropIndex
DROP INDEX `Market_marketId_collateralId_key` ON `Market`;

-- AlterTable
ALTER TABLE `Market` DROP COLUMN `collateralAddress`,
    DROP COLUMN `collateralId`,
    ADD COLUMN `createdAt_` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt_` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`marketId`);

-- AlterTable
ALTER TABLE `Token` ADD COLUMN `createdAt_` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt_` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `MarketDailyUsage` (
    `marketId` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `timestamp` INTEGER NOT NULL,
    `interactionCount` INTEGER NOT NULL,
    `liquidationCount` INTEGER NOT NULL,
    `uniqueUserCount` INTEGER NOT NULL,

    PRIMARY KEY (`marketId`, `day`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MarketCollateral` (
    `marketId` VARCHAR(191) NOT NULL,
    `collateralId` VARCHAR(191) NOT NULL,
    `baseId` VARCHAR(191) NOT NULL,
    `baseAddress` VARCHAR(191) NOT NULL,
    `collateralAddress` VARCHAR(191) NOT NULL,
    `createdAt_` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt_` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MarketCollateral_marketId_collateralId_key`(`marketId`, `collateralId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CollateralStats` (
    `marketId` VARCHAR(191) NOT NULL,
    `collateralId` VARCHAR(191) NOT NULL,
    `reserves` VARCHAR(191) NOT NULL,
    `reservesUsd` VARCHAR(191) NOT NULL,
    `balance` VARCHAR(191) NOT NULL,
    `balanceUsd` VARCHAR(191) NOT NULL,
    `liquidationFactor` VARCHAR(191) NOT NULL,
    `liquidateCollateralFactor` VARCHAR(191) NOT NULL,
    `priceFeed` VARCHAR(191) NOT NULL,
    `lastPriceUsd` VARCHAR(191) NOT NULL,
    `createdAt_` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt_` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CollateralStats_marketId_collateralId_key`(`marketId`, `collateralId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MarketDailyUsage` ADD CONSTRAINT `MarketDailyUsage_marketId_fkey` FOREIGN KEY (`marketId`) REFERENCES `Market`(`marketId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketCollateral` ADD CONSTRAINT `MarketCollateral_marketId_fkey` FOREIGN KEY (`marketId`) REFERENCES `Market`(`marketId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketCollateral` ADD CONSTRAINT `MarketCollateral_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketCollateral` ADD CONSTRAINT `MarketCollateral_collateralId_fkey` FOREIGN KEY (`collateralId`) REFERENCES `Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollateralStats` ADD CONSTRAINT `CollateralStats_marketId_collateralId_fkey` FOREIGN KEY (`marketId`, `collateralId`) REFERENCES `MarketCollateral`(`marketId`, `collateralId`) ON DELETE RESTRICT ON UPDATE CASCADE;
