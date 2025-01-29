-- DropForeignKey
ALTER TABLE "kniha" DROP CONSTRAINT "kniha_autor_id_fkey";

-- AddForeignKey
ALTER TABLE "kniha" ADD CONSTRAINT "kniha_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "autor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
