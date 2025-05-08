import prisma from "../db/client.js";

//Rota para adicionar um destino
export const postDestino =  async (req, res) => {
    const { DES_NOME } = req.body;

    try {
        const destino = await prisma.destino.create({data: { DES_NOME }});
        res.json(destino);
    }
    catch (error) {
        res.status(400).json({error: "Destino já existe!"});
    }
};