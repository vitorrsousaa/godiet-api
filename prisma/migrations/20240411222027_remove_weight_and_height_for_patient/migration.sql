/*
  Warnings:

  - You are about to drop the column `height` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `patients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "height",
DROP COLUMN "weight";
