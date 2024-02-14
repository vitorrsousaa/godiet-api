/*
  Warnings:

  - You are about to drop the column `categoryNameId` on the `meal_foods` table. All the data in the column will be lost.
  - You are about to drop the column `mealId` on the `meal_foods` table. All the data in the column will be lost.
  - You are about to drop the column `planningMealId` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `planning_meals` table. All the data in the column will be lost.
  - Added the required column `category_name_id` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal_id` to the `meal_foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planning_meal_id` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `planning_meals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meal_foods" DROP CONSTRAINT "meal_foods_mealId_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_planningMealId_fkey";

-- DropForeignKey
ALTER TABLE "planning_meals" DROP CONSTRAINT "planning_meals_patientId_fkey";

-- AlterTable
ALTER TABLE "meal_foods" DROP COLUMN "categoryNameId",
DROP COLUMN "mealId",
ADD COLUMN     "category_name_id" UUID NOT NULL,
ADD COLUMN     "meal_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "planningMealId",
ADD COLUMN     "planning_meal_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "planning_meals" DROP COLUMN "patientId",
ADD COLUMN     "patient_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "planning_meals" ADD CONSTRAINT "planning_meals_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_planning_meal_id_fkey" FOREIGN KEY ("planning_meal_id") REFERENCES "planning_meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
