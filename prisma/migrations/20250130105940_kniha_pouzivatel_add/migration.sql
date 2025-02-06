-- CreateTable
CREATE TABLE "kniha_pouzivatel" (
    "id" SERIAL NOT NULL,
    "kniha_id" INTEGER NOT NULL,
    "pouzivatel_id" INTEGER NOT NULL,
    "stav" "stav" NOT NULL,
    "vytvorene" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "poznamka" TEXT,

    CONSTRAINT "kniha_pouzivatel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kniha_pouzivatel" ADD CONSTRAINT "kniha_pouzivatel_kniha_id_fkey" FOREIGN KEY ("kniha_id") REFERENCES "kniha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kniha_pouzivatel" ADD CONSTRAINT "kniha_pouzivatel_pouzivatel_id_fkey" FOREIGN KEY ("pouzivatel_id") REFERENCES "pouzivatel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
