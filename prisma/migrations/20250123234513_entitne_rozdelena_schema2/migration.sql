/*
  Warnings:

  - You are about to drop the column `os_udaje_id` on the `klient` table. All the data in the column will be lost.
  - You are about to drop the column `os_udaje_id` on the `maser` table. All the data in the column will be lost.
  - Added the required column `email` to the `klient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meno` to the `klient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priezvisko` to the `klient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefon` to the `klient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `maser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meno` to the `maser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priezvisko` to the `maser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefon` to the `maser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "klient" DROP CONSTRAINT "klient_os_udaje_id_fkey";

-- DropForeignKey
ALTER TABLE "maser" DROP CONSTRAINT "maser_os_udaje_id_fkey";

-- DropIndex
DROP INDEX "klient_os_udaje_id_key";

-- DropIndex
DROP INDEX "maser_os_udaje_id_key";

-- AlterTable
ALTER TABLE "klient" DROP COLUMN "os_udaje_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "meno" TEXT NOT NULL,
ADD COLUMN     "priezvisko" TEXT NOT NULL,
ADD COLUMN     "telefon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "maser" DROP COLUMN "os_udaje_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "meno" TEXT NOT NULL,
ADD COLUMN     "priezvisko" TEXT NOT NULL,
ADD COLUMN     "telefon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "os_udaje" ADD COLUMN     "klientId" INTEGER,
ADD COLUMN     "maserId" INTEGER;

-- AddForeignKey
ALTER TABLE "os_udaje" ADD CONSTRAINT "os_udaje_maserId_fkey" FOREIGN KEY ("maserId") REFERENCES "maser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "os_udaje" ADD CONSTRAINT "os_udaje_klientId_fkey" FOREIGN KEY ("klientId") REFERENCES "klient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
