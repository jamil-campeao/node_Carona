/*
  Warnings:

  - You are about to drop the column `data` on the `Carona` table. All the data in the column will be lost.
  - Added the required column `CAR_DATA` to the `Carona` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Carona" DROP COLUMN "data",
ADD COLUMN     "CAR_DATA" TIMESTAMP(3) NOT NULL;
