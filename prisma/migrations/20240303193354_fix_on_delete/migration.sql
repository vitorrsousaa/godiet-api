-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_planning_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "planning_meals" DROP CONSTRAINT "planning_meals_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "planning_meals" DROP CONSTRAINT "planning_meals_user_id_fkey";

-- AddForeignKey
ALTER TABLE "planning_meals" ADD CONSTRAINT "planning_meals_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_meals" ADD CONSTRAINT "planning_meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_planning_meal_id_fkey" FOREIGN KEY ("planning_meal_id") REFERENCES "planning_meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
