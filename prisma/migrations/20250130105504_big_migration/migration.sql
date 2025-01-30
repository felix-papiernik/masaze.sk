/*
  Warnings:

  - You are about to drop the `kniha_pouzivatel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "kniha_pouzivatel" DROP CONSTRAINT "kniha_pouzivatel_kniha_id_fkey";

-- DropForeignKey
ALTER TABLE "kniha_pouzivatel" DROP CONSTRAINT "kniha_pouzivatel_pouzivatel_id_fkey";

-- DropTable
DROP TABLE "kniha_pouzivatel";
