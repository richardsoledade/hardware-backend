-- CreateTable
CREATE TABLE "hardware" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "componente" TEXT,
    "marca" TEXT,
    "nome" TEXT,
    "versao" TEXT,
    "preco" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "hardware_versao_key" ON "hardware"("versao");
