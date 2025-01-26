/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `kniha` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `kniha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kniha" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "kniha_slug_key" ON "kniha"("slug");
