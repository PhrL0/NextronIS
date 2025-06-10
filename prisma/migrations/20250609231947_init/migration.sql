/*
  Warnings:

  - You are about to drop the `itemvenda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `venda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemvenda` DROP FOREIGN KEY `ItemVenda_produtoId_fkey`;

-- DropForeignKey
ALTER TABLE `itemvenda` DROP FOREIGN KEY `ItemVenda_vendaId_fkey`;

-- DropForeignKey
ALTER TABLE `venda` DROP FOREIGN KEY `Venda_usuarioId_fkey`;

-- DropTable
DROP TABLE `itemvenda`;

-- DropTable
DROP TABLE `produto`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `venda`;

-- CreateTable
CREATE TABLE `dados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATE NOT NULL,
    `hora` TIME NOT NULL,
    `temperatura` DOUBLE NOT NULL,
    `nivel` DOUBLE NOT NULL,
    `rpm` DOUBLE NOT NULL,
    `corrente` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `usuarios_usuario_key`(`usuario`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
