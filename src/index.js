const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());

server.use(cors());

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Rota de servidor
function consultarHardware(versao) {
    return prisma.hardware.findUnique({
      where: {
        versao,
      },
    });
  }

server.get("/hardware", async (req, res)=>{
    const hardwares = await prisma.hardware.findMany();
     return res.json(hardwares)
});

server.get("/hardware/:marca", async (req, res)=>{
      const {marca} = req.params
      const hardware = await prisma.hardware.findMany({
        where: {
          marca: marca,
        }
    });   
      return hardware.length > 0 ? res.json(hardware)
      : res.status(500).json("busca sem retorno")
  });


server.get("/hardware/nome/:nome", async (req, res)=>{
  const {nome} = req.params
  const hardware = await prisma.hardware.findMany({
    where: {
      nome
  }
});

return hardware.length > 0 
? res.json(hardware)
: res.status(500).json("busca sem retorno")
});

server.post ("/hardware", async (req,res)=>{
 const hardExistente = await prisma.hardware.findUnique({
    where: {
      versao: req.body.versao
  }
});   
if (hardExistente) {
  res.status(500).json("hardware já anexado")
} else {
  const hardware = await prisma.hardware.create({
    data: req.body
   })
   return res.json(hardware)
  }
});

server.delete ("/hardware/:versao", async (req, res)=> {

  if(await consultarHardware(req.params.versao)){
    const hardware = await prisma.hardware.delete({
      where: {
        versao: req.params.versao
      }
    })
    return res.json(hardware)
  } else { 
    return res.status(500).json("busca sem retorno")
  }
});

server.put("/hardware", async (req, res) => {
  if (await consultarHardware(req.body.versao)) {
    const hardware = await prisma.hardware.update({
      data: req.body,
      where: {
        versao: req.body.versao,
      },
    });
    return res.json(hardware);
  } else {
    return res.status(500).json("hardware não atualizado");
  }
});

server.listen(3300, () => {
    console.log("Server Open");
  });