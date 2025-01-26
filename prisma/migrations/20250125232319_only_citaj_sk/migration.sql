/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MassageType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cennik_masaze` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `klient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maserstvo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `os_udaje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rezervacia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `typ_masaze` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zamestnanec` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `popis` to the `zaner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_massage_id_fkey";

-- DropForeignKey
ALTER TABLE "cennik_masaze" DROP CONSTRAINT "cennik_masaze_typ_masaze_id_fkey";

-- DropForeignKey
ALTER TABLE "os_udaje" DROP CONSTRAINT "os_udaje_klientId_fkey";

-- DropForeignKey
ALTER TABLE "os_udaje" DROP CONSTRAINT "os_udaje_maserId_fkey";

-- DropForeignKey
ALTER TABLE "rezervacia" DROP CONSTRAINT "rezervacia_klient_id_fkey";

-- DropForeignKey
ALTER TABLE "rezervacia" DROP CONSTRAINT "rezervacia_maser_id_fkey";

-- DropForeignKey
ALTER TABLE "typ_masaze" DROP CONSTRAINT "typ_masaze_maserstvo_id_fkey";

-- DropForeignKey
ALTER TABLE "zamestnanec" DROP CONSTRAINT "zamestnanec_maser_id_fkey";

-- DropForeignKey
ALTER TABLE "zamestnanec" DROP CONSTRAINT "zamestnanec_maserstvo_id_fkey";

-- AlterTable
ALTER TABLE "zaner" ADD COLUMN     "popis" TEXT NOT NULL;

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "MassageType";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "cennik_masaze";

-- DropTable
DROP TABLE "klient";

-- DropTable
DROP TABLE "maser";

-- DropTable
DROP TABLE "maserstvo";

-- DropTable
DROP TABLE "os_udaje";

-- DropTable
DROP TABLE "rezervacia";

-- DropTable
DROP TABLE "typ_masaze";

-- DropTable
DROP TABLE "zamestnanec";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "status_rezervacie";
