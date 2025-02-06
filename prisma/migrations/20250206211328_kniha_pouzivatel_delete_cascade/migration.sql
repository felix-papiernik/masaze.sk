-- DropForeignKey
ALTER TABLE "kniha_pouzivatel" DROP CONSTRAINT "kniha_pouzivatel_kniha_id_fkey";

-- DropForeignKey
ALTER TABLE "kniha_pouzivatel" DROP CONSTRAINT "kniha_pouzivatel_pouzivatel_id_fkey";

-- AddForeignKey
ALTER TABLE "kniha_pouzivatel" ADD CONSTRAINT "kniha_pouzivatel_kniha_id_fkey" FOREIGN KEY ("kniha_id") REFERENCES "kniha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kniha_pouzivatel" ADD CONSTRAINT "kniha_pouzivatel_pouzivatel_id_fkey" FOREIGN KEY ("pouzivatel_id") REFERENCES "pouzivatel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
