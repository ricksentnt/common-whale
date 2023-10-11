-- DropForeignKey
ALTER TABLE `CollateralStats` DROP FOREIGN KEY `CollateralStats_marketId_collateralId_fkey`;

-- DropForeignKey
ALTER TABLE `MarketCollateral` DROP FOREIGN KEY `MarketCollateral_baseId_fkey`;

-- DropForeignKey
ALTER TABLE `MarketCollateral` DROP FOREIGN KEY `MarketCollateral_collateralId_fkey`;

-- DropForeignKey
ALTER TABLE `MarketDailyUsage` DROP FOREIGN KEY `MarketDailyUsage_marketId_fkey`;

-- AddForeignKey
ALTER TABLE `MarketDailyUsage` ADD CONSTRAINT `MarketDailyUsage_marketId_fkey` FOREIGN KEY (`marketId`) REFERENCES `Market`(`marketId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketCollateral` ADD CONSTRAINT `MarketCollateral_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `Token`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketCollateral` ADD CONSTRAINT `MarketCollateral_collateralId_fkey` FOREIGN KEY (`collateralId`) REFERENCES `Token`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollateralStats` ADD CONSTRAINT `CollateralStats_marketId_collateralId_fkey` FOREIGN KEY (`marketId`, `collateralId`) REFERENCES `MarketCollateral`(`marketId`, `collateralId`) ON DELETE CASCADE ON UPDATE CASCADE;
