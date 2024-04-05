/*
  Warnings:

  - You are about to drop the column `category_name_id` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the `category_name` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryName` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "foods" DROP CONSTRAINT "foods_category_name_id_fkey";

-- AlterTable
ALTER TABLE "foods" DROP COLUMN "category_name_id",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- DropTable
DROP TABLE "category_name";
