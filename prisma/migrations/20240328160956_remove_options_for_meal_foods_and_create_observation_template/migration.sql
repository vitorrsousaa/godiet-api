/*
  Warnings:

  - You are about to drop the column `options` on the `meal_foods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meal_foods" DROP COLUMN "options";

-- CreateTable
CREATE TABLE "observation_templates" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "observation_templates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "observation_templates" ADD CONSTRAINT "observation_templates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
