-- CreateTable
CREATE TABLE "category_name" (
    "id" UUID NOT NULL,
    "base_protein" DOUBLE PRECISION NOT NULL,
    "base_carbo" DOUBLE PRECISION NOT NULL,
    "base_fat" DOUBLE PRECISION NOT NULL,
    "base_energy" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "category_name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" UUID NOT NULL,
    "base_unit" TEXT NOT NULL,
    "base_qty" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "attributes" JSONB[],
    "category_name_id" UUID NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_name_key" ON "category_name"("name");

-- CreateIndex
CREATE UNIQUE INDEX "foods_name_key" ON "foods"("name");

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_category_name_id_fkey" FOREIGN KEY ("category_name_id") REFERENCES "category_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
