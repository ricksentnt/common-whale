-- CreateTable
CREATE TABLE `Market` (
    `marketId` VARCHAR(191) NOT NULL,
    `baseId` VARCHAR(191) NOT NULL,
    `collateralId` VARCHAR(191) NOT NULL,
    `baseAddress` VARCHAR(191) NOT NULL,
    `collateralAddress` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Market_marketId_baseId_collateralId_key`(`marketId`, `baseId`, `collateralId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `symbol` VARCHAR(191) NOT NULL,
    `decimals` INTEGER NOT NULL,
    `logo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Market` ADD CONSTRAINT `Market_baseId_fkey` FOREIGN KEY (`baseId`) REFERENCES `Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Market` ADD CONSTRAINT `Market_collateralId_fkey` FOREIGN KEY (`collateralId`) REFERENCES `Token`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
