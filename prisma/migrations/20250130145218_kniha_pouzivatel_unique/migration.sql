/*
  Warnings:

  - A unique constraint covering the columns `[kniha_id,pouzivatel_id]` on the table `kniha_pouzivatel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "kniha_pouzivatel_kniha_id_pouzivatel_id_key" ON "kniha_pouzivatel"("kniha_id", "pouzivatel_id");
