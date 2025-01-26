/*
  Warnings:

  - You are about to drop the column `slug` on the `kniha` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nazov]` on the table `kniha` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "kniha_slug_key";

-- AlterTable
ALTER TABLE "kniha" DROP COLUMN "slug";

-- CreateIndex
CREATE UNIQUE INDEX "kniha_nazov_key" ON "kniha"("nazov");
