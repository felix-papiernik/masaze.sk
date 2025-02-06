-- CreateEnum
CREATE TYPE "stav" AS ENUM ('chcemPrecitat', 'precitane', 'vratene');

-- CreateTable
CREATE TABLE "pouzivatel" (
    "id" SERIAL NOT NULL,
    "meno" TEXT NOT NULL,
    "priezvisko" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash_heslo" TEXT NOT NULL,
    "je_admin" BOOLEAN NOT NULL,

    CONSTRAINT "pouzivatel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kniha" (
    "id" SERIAL NOT NULL,
    "nazov" TEXT NOT NULL,
    "rok_vydania" INTEGER NOT NULL,
    "pocet_stran" INTEGER NOT NULL,
    "autor_id" INTEGER NOT NULL,
    "zaner_id" INTEGER NOT NULL,

    CONSTRAINT "kniha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autor" (
    "id" SERIAL NOT NULL,
    "meno" TEXT NOT NULL,
    "priezvisko" TEXT NOT NULL,
    "narodnost" TEXT NOT NULL,
    "datum_nar" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zaner" (
    "id" SERIAL NOT NULL,
    "nazov" TEXT NOT NULL,

    CONSTRAINT "zaner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kniha_pouzivatel" (
    "id" SERIAL NOT NULL,
    "kniha_id" INTEGER NOT NULL,
    "pouzivatel_id" INTEGER NOT NULL,
    "precitane" BOOLEAN NOT NULL DEFAULT false,
    "oblubene" BOOLEAN NOT NULL DEFAULT false,
    "poznamka" TEXT,

    CONSTRAINT "kniha_pouzivatel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pouzivatel_email_key" ON "pouzivatel"("email");

-- AddForeignKey
ALTER TABLE "kniha" ADD CONSTRAINT "kniha_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kniha" ADD CONSTRAINT "kniha_zaner_id_fkey" FOREIGN KEY ("zaner_id") REFERENCES "zaner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kniha_pouzivatel" ADD CONSTRAINT "kniha_pouzivatel_kniha_id_fkey" FOREIGN KEY ("kniha_id") REFERENCES "kniha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kniha_pouzivatel" ADD CONSTRAINT "kniha_pouzivatel_pouzivatel_id_fkey" FOREIGN KEY ("pouzivatel_id") REFERENCES "pouzivatel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
