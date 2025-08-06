/*
  Warnings:

  - You are about to drop the column `category` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropIndex
DROP INDEX `OrderItem_orderId_fkey` ON `orderitem`;

-- DropIndex
DROP INDEX `OrderItem_productId_fkey` ON `orderitem`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `category`,
    DROP COLUMN `stock`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
