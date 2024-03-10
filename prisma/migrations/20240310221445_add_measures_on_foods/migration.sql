-- AlterTable
ALTER TABLE "foods" ADD COLUMN     "measures" JSONB[] DEFAULT ARRAY[]::JSONB[];
