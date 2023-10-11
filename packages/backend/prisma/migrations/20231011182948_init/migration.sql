/*
  Warnings:

  - You are about to drop the column `baseAddress` on the `Market` table. All the data in the column will be lost.
  - You are about to drop the column `baseId` on the `Market` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Market_baseId_fkey` ON `Market`;

-- AlterTable
ALTER TABLE `Market` DROP COLUMN `baseAddress`,
    DROP COLUMN `baseId`;
