/*
  Warnings:

  - Added the required column `borrowCollateralFactor` to the `CollateralStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplyCap` to the `CollateralStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `MarketCollateral_baseId_fkey` ON `MarketCollateral`;

-- DropIndex
DROP INDEX `MarketCollateral_collateralId_fkey` ON `MarketCollateral`;

-- AlterTable
ALTER TABLE `CollateralStats` ADD COLUMN `borrowCollateralFactor` VARCHAR(191) NOT NULL,
    ADD COLUMN `supplyCap` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Market` ADD COLUMN `name` VARCHAR(191) NOT NULL;
