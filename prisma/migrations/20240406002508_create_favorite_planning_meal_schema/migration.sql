-- AlterTable
ALTER TABLE "meals" ADD COLUMN     "favoritePlanningMealId" UUID;

-- CreateTable
CREATE TABLE "favorite_planning_meal" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "favorite_planning_meal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_favoritePlanningMealId_fkey" FOREIGN KEY ("favoritePlanningMealId") REFERENCES "favorite_planning_meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_planning_meal" ADD CONSTRAINT "favorite_planning_meal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
