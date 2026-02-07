/*
  Warnings:

  - The primary key for the `invoice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `invoice` table. All the data in the column will be lost.
  - You are about to alter the column `invoiceNumber` on the `invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Invoice_invoiceNumber_key` ON `invoice`;

-- AlterTable
ALTER TABLE `invoice` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `invoiceNumber` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`invoiceNumber`);
