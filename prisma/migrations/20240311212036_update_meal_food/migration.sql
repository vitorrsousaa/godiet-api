/*
  Warnings:

  - You are about to drop the column `category_name_id` on the `meal_foods` table. All the data in the column will be lost.
  - You are about to drop the column `portion` on the `meal_foods` table. All the data in the column will be lost.
  - The `options` column on the `meal_foods` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `food_id` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `meal_foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meal_foods" DROP COLUMN "category_name_id",
DROP COLUMN "portion",
ADD COLUMN     "food_id" UUID NOT NULL,
ADD COLUMN     "measure" JSONB NOT NULL,
ADD COLUMN     "qty" DOUBLE PRECISION NOT NULL,
DROP COLUMN "options",
ADD COLUMN     "options" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_food_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
