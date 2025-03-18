/*
  Warnings:

  - The primary key for the `Carona` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Carona` table. All the data in the column will be lost.
  - You are about to drop the column `passageiro` on the `Carona` table. All the data in the column will be lost.
  - Added the required column `DES_ID` to the `Carona` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PAS_ID` to the `Carona` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carona" DROP CONSTRAINT "Carona_pkey",
DROP COLUMN "id",
DROP COLUMN "passageiro",
ADD COLUMN     "CAR_ID" SERIAL NOT NULL,
ADD COLUMN     "DES_ID" INTEGER NOT NULL,
ADD COLUMN     "PAS_ID" INTEGER NOT NULL,
ALTER COLUMN "data" DROP DEFAULT,
ADD CONSTRAINT "Carona_pkey" PRIMARY KEY ("CAR_ID");

-- CreateTable
CREATE TABLE "Passageiro" (
    "PAS_ID" SERIAL NOT NULL,
    "PAS_NOME" TEXT NOT NULL,

    CONSTRAINT "Passageiro_pkey" PRIMARY KEY ("PAS_ID")
);

-- CreateTable
CREATE TABLE "Destino" (
    "DES_ID" SERIAL NOT NULL,
    "DES_NOME" TEXT NOT NULL,

    CONSTRAINT "Destino_pkey" PRIMARY KEY ("DES_ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passageiro_PAS_NOME_key" ON "Passageiro"("PAS_NOME");

-- CreateIndex
CREATE UNIQUE INDEX "Destino_DES_NOME_key" ON "Destino"("DES_NOME");

-- AddForeignKey
ALTER TABLE "Carona" ADD CONSTRAINT "Carona_PAS_ID_fkey" FOREIGN KEY ("PAS_ID") REFERENCES "Passageiro"("PAS_ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carona" ADD CONSTRAINT "Carona_DES_ID_fkey" FOREIGN KEY ("DES_ID") REFERENCES "Destino"("DES_ID") ON DELETE RESTRICT ON UPDATE CASCADE;
