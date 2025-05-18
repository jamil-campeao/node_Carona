import prisma from "../db/client.js";

//Rota para adicionar um destino
export const postDestino =  async (req, res) => {
    const { DES_NOME } = req.body;

    try {
        const destino = await prisma.destino.create({data: { DES_NOME }});
        res.status(201).json(destino);
    }
    catch (error) {
        res.status(400).json({error: "Destino já existe!"});
    }
};

//Rota para retornar os destinos
export const getDestino = async (req, res) => {
    try {
        const destinos = await prisma.destino.findMany();

        if (!destinos) {
            return res.status(500).json({error: "Erro ao retornar destinos"});
        }

        return res.status(200).json(destinos);
    } catch (error) {
        return res.status(500).json({error: "Erro ao retornar destinos"});
    }
}