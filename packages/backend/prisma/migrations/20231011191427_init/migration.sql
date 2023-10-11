-- DropForeignKey
ALTER TABLE `MarketCollateral` DROP FOREIGN KEY `MarketCollateral_baseId_fkey`;

-- DropForeignKey
ALTER TABLE `MarketCollateral` DROP FOREIGN KEY `MarketCollateral_collateralId_fkey`;

-- AddForeignKey
ALTER TABLE `MarketCollateral` ADD CONSTRAINT `MarketCollateral_baseAddress_fkey` FOREIGN KEY (`baseAddress`) REFERENCES `Token`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MarketCollateral` ADD CONSTRAINT `MarketCollateral_collateralAddress_fkey` FOREIGN KEY (`collateralAddress`) REFERENCES `Token`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
