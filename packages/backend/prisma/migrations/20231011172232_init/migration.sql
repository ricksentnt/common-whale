-- DropIndex
DROP INDEX `Market_marketId_baseId_collateralId_key` ON `Market`;

-- AlterTable
ALTER TABLE `Market` ADD PRIMARY KEY (`marketId`);
