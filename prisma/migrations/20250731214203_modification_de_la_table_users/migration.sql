/*
  Warnings:

  - Added the required column `lieuLivraison` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephon` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropIndex
DROP INDEX `OrderItems_orderId_fkey` ON `orderitems`;

-- DropIndex
DROP INDEX `OrderItems_productId_fkey` ON `orderitems`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lieuLivraison` VARCHAR(191) NOT NULL,
    ADD COLUMN `telephon` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
