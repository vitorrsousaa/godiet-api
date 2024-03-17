-- DropForeignKey
ALTER TABLE "meal_foods" DROP CONSTRAINT "meal_foods_meal_id_fkey";

-- AlterTable
ALTER TABLE "meal_foods" ADD COLUMN     "favorite_meal_id" UUID,
ALTER COLUMN "meal_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "favorite_meal" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "favorite_meal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "meals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_foods" ADD CONSTRAINT "meal_foods_favorite_meal_id_fkey" FOREIGN KEY ("favorite_meal_id") REFERENCES "favorite_meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
