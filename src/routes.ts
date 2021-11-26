import { Request, Response, Router } from "express";
import { Readable } from "stream";
import readline from "readline";

//import dateFormat, { masks } from "dateformat";

import multer from "multer";
import { client } from "./database/client";

const multerConfig = multer();

const router = Router();

//const now = new Date();

interface Inventor {
  central_de_estoque: string;
  agrupamento_1: string;
  agrupamento_2: string;
  codigo_item: number;
  item: string;
  unidade_compra_estoque: string;
  fabricante: string;
  data_compra: string;
  quantidade: number;
  preco_medio: number;
  valor: number;
}



// router.get("/inventory", async (request: Request, response: Response) => {
//   try {
//     //const allOutsourcing = await client.query

//     const result = await client.$queryRaw`SELECT * FROM inventory`;
//     //console.log(result);
//     return response.json(result);

//   } catch (err) {
//     console.log("erro");
//   }

//   //return response.json({ message: "Hello World Ignite!" });
// });

router.get("/inventory/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    //const allOutsourcing = await client.query
    //console.log(id);

    //const inventoryId = await client.$queryRaw`SELECT * FROM inventory WHERE codigo_item = ${id}`;

    //console.log(inventoryId);

    // Find a user by email

    const inventory: Inventor[] = [];

    const codigoItem = await client.inventory.findUnique({
      where: {
        inventory.: ${ inventory.} 
      },
})

console.log(codigoItem);

    //return response.json(result);
    //return res.json(productId);

  } catch (err) {
  console.log("erro");
  //return request.status(500).send({ message: "Producto não encontrado!" });
}

  //return response.json({ message: "Hello World Ignite!" });
});

router.post(
  "/inventory",
  multerConfig.single("file"),
  async (request: Request, response: Response) => {
    const { file } = request;
    const { buffer }: any = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const inventoryLine = readline.createInterface({
      input: readableFile,
    });

    const inventory: Inventor[] = [];

    for await (let line of inventoryLine) {
      const inventoryLineSplit = line.split(";");

      //const data_compra = new SimpleDateFormat("yyyy-MM-dd");
      //formatedd()


      inventory.push({
        central_de_estoque: inventoryLineSplit[0],
        agrupamento_1: inventoryLineSplit[1],
        agrupamento_2: inventoryLineSplit[2],
        codigo_item: Number(inventoryLineSplit[3]),
        item: inventoryLineSplit[4],
        unidade_compra_estoque: inventoryLineSplit[5],
        fabricante: inventoryLineSplit[6],
        data_compra: inventoryLineSplit[7],
        quantidade: Number(inventoryLineSplit[8]),
        preco_medio: Number(inventoryLineSplit[9]),
        valor: Number(inventoryLineSplit[10]),
      });
    }

    for await (let { central_de_estoque, agrupamento_1, agrupamento_2, codigo_item, item, unidade_compra_estoque, fabricante, data_compra, quantidade, preco_medio, valor } of inventory) {
      await client.inventory.create({
        data: {
          central_de_estoque,
          agrupamento_1,
          agrupamento_2,
          codigo_item,
          item,
          unidade_compra_estoque,
          fabricante,
          data_compra,
          quantidade,
          preco_medio,
          valor,
        },
      });
    }

    return response.send(inventory);
  })

export { router };