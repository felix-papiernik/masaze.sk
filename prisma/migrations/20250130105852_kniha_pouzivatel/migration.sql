/*
  Warnings:

  - The values [vratene] on the enum `stav` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "stav_new" AS ENUM ('chcemPrecitat', 'precitane');
ALTER TYPE "stav" RENAME TO "stav_old";
ALTER TYPE "stav_new" RENAME TO "stav";
DROP TYPE "stav_old";
COMMIT;
