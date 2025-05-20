/*
  Warnings:

  - Added the required column `hyperparameterArmId` to the `InteracaoIA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `interacaoia` ADD COLUMN `hyperparameterArmId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `HyperparameterArm` (
    `id` VARCHAR(191) NOT NULL,
    `modelName` VARCHAR(191) NOT NULL,
    `version` VARCHAR(191) NULL,
    `temperature` DOUBLE NOT NULL,
    `topP` DOUBLE NOT NULL,
    `topK` INTEGER NOT NULL,
    `maxOutputTokens` INTEGER NOT NULL,
    `responseMimeType` VARCHAR(191) NOT NULL,
    `successes` INTEGER NOT NULL DEFAULT 0,
    `failures` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InteracaoIA` ADD CONSTRAINT `InteracaoIA_hyperparameterArmId_fkey` FOREIGN KEY (`hyperparameterArmId`) REFERENCES `HyperparameterArm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
