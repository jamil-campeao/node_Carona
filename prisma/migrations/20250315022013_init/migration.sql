-- CreateTable
CREATE TABLE "Carona" (
    "id" SERIAL NOT NULL,
    "passageiro" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carona_pkey" PRIMARY KEY ("id")
);
