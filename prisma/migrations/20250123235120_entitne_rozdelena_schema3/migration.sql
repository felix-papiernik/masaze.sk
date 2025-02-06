/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `klient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `maser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login]` on the table `maserstvo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "klient_email_key" ON "klient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "maser_email_key" ON "maser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "maserstvo_login_key" ON "maserstvo"("login");
