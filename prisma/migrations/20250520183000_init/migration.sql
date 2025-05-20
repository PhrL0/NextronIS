-- AlterTable
ALTER TABLE `hyperparameterarm` MODIFY `modelName` VARCHAR(191) NULL,
    MODIFY `successes` INTEGER NULL DEFAULT 0,
    MODIFY `failures` INTEGER NULL DEFAULT 0;
