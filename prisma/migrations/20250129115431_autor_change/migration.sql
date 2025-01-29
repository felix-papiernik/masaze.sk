/*
  Warnings:

  - You are about to drop the column `narodnost` on the `autor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "autor" DROP COLUMN "narodnost",
ADD COLUMN     "info" TEXT NOT NULL DEFAULT '';
