-- AlterTable
ALTER TABLE "patients" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT 'null';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT NOT NULL DEFAULT 'null';
