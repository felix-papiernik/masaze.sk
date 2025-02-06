/*
  Warnings:

  - A unique constraint covering the columns `[meno,priezvisko]` on the table `autor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nazov]` on the table `zaner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "autor_meno_priezvisko_key" ON "autor"("meno", "priezvisko");

-- CreateIndex
CREATE UNIQUE INDEX "zaner_nazov_key" ON "zaner"("nazov");
