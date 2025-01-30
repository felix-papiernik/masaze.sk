/*
  Warnings:

  - Made the column `poznamka` on table `kniha_pouzivatel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "kniha_pouzivatel" ALTER COLUMN "stav" SET DEFAULT 'chcemPrecitat',
ALTER COLUMN "poznamka" SET NOT NULL,
ALTER COLUMN "poznamka" SET DEFAULT '';
