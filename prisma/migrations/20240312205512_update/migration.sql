-- DropForeignKey
ALTER TABLE "meal_foods" DROP CONSTRAINT "meal_foods_meal_id_fkey";

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
