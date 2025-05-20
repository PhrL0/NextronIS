/*
  Warnings:

  - You are about to alter the column `feedbackUsuario` on the `interacaoia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `interacaoia` MODIFY `feedbackUsuario` INTEGER NULL;
