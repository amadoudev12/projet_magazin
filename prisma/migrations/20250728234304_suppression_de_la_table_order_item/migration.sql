/*
  Warnings:

  - You are about to drop the `orderitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropTable
DROP TABLE `orderitem`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
