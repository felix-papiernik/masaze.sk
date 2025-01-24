-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "status_rezervacie" AS ENUM ('potvrdena', 'dokoncena', 'zrusena');

-- CreateTable
CREATE TABLE "MassageType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "durationMinutes" INTEGER NOT NULL,

    CONSTRAINT "MassageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "client_id" INTEGER NOT NULL,
    "massage_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "os_udaje" (
    "id" SERIAL NOT NULL,
    "meno" TEXT NOT NULL,
    "priezvisko" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "vymazane" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "os_udaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maser" (
    "id" SERIAL NOT NULL,
    "os_udaje_id" INTEGER NOT NULL,
    "hash_heslo" TEXT NOT NULL,
    "vymazane" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "maser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "klient" (
    "id" SERIAL NOT NULL,
    "os_udaje_id" INTEGER NOT NULL,
    "hash_heslo" TEXT NOT NULL,

    CONSTRAINT "klient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zamestnanec" (
    "id" SERIAL NOT NULL,
    "maser_id" INTEGER NOT NULL,
    "maserstvo_id" INTEGER NOT NULL,
    "mzda" DOUBLE PRECISION NOT NULL,
    "od" TIMESTAMP(3) NOT NULL,
    "do" TIMESTAMP(3),
    "potvrdene" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "zamestnanec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maserstvo" (
    "id" SERIAL NOT NULL,
    "nazov" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "hash_heslo" TEXT NOT NULL,
    "mesto" TEXT NOT NULL,
    "psc" TEXT NOT NULL,
    "ulica" TEXT NOT NULL,
    "cislo_domu" TEXT NOT NULL,

    CONSTRAINT "maserstvo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rezervacia" (
    "id" SERIAL NOT NULL,
    "maser_id" INTEGER NOT NULL,
    "klient_id" INTEGER NOT NULL,
    "termin" TIMESTAMP(3) NOT NULL,
    "status" "status_rezervacie" NOT NULL DEFAULT 'potvrdena',
    "vymazane" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "rezervacia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cennik_masaze" (
    "id" SERIAL NOT NULL,
    "od" TIMESTAMP(3) NOT NULL,
    "do" TIMESTAMP(3),
    "typ_masaze_id" INTEGER NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,
    "vymazane" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "cennik_masaze_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typ_masaze" (
    "id" SERIAL NOT NULL,
    "nazov" TEXT NOT NULL,
    "popis" TEXT NOT NULL,
    "trvanie_minuty" INTEGER NOT NULL,
    "maserstvo_id" INTEGER NOT NULL,
    "vymazane" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "typ_masaze_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "maser_os_udaje_id_key" ON "maser"("os_udaje_id");

-- CreateIndex
CREATE UNIQUE INDEX "klient_os_udaje_id_key" ON "klient"("os_udaje_id");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_massage_id_fkey" FOREIGN KEY ("massage_id") REFERENCES "MassageType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maser" ADD CONSTRAINT "maser_os_udaje_id_fkey" FOREIGN KEY ("os_udaje_id") REFERENCES "os_udaje"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "klient" ADD CONSTRAINT "klient_os_udaje_id_fkey" FOREIGN KEY ("os_udaje_id") REFERENCES "os_udaje"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zamestnanec" ADD CONSTRAINT "zamestnanec_maser_id_fkey" FOREIGN KEY ("maser_id") REFERENCES "maser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zamestnanec" ADD CONSTRAINT "zamestnanec_maserstvo_id_fkey" FOREIGN KEY ("maserstvo_id") REFERENCES "maserstvo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rezervacia" ADD CONSTRAINT "rezervacia_maser_id_fkey" FOREIGN KEY ("maser_id") REFERENCES "maser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rezervacia" ADD CONSTRAINT "rezervacia_klient_id_fkey" FOREIGN KEY ("klient_id") REFERENCES "klient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cennik_masaze" ADD CONSTRAINT "cennik_masaze_typ_masaze_id_fkey" FOREIGN KEY ("typ_masaze_id") REFERENCES "typ_masaze"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "typ_masaze" ADD CONSTRAINT "typ_masaze_maserstvo_id_fkey" FOREIGN KEY ("maserstvo_id") REFERENCES "maserstvo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
