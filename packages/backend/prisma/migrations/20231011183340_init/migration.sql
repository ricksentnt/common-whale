/*
  Warnings:

  - Added the required column `symbol` to the `Market` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Market` ADD COLUMN `symbol` VARCHAR(191) NOT NULL;
