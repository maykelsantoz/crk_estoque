-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "central_de_estoque" TEXT NOT NULL,
    "agrupamento_1" TEXT NOT NULL,
    "agrupamento_2" TEXT NOT NULL,
    "codigo_item" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "unidade_compra_estoque" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "data_compra" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_medio" DOUBLE PRECISION NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);
