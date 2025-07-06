import prisma from "../db/client.js";

//Rota para adicionar um destino
export const postDestino =  async (req, res) => {
    const { DES_NOME, DES_KM } = req.body;

    try {
        //1. Verifico se o destino com esse nome já existe
        const destinoExistente = await prisma.destino.findFirst({
            where: {
                DES_NOME: {
                    equals: DES_NOME,
                    mode: 'insensitive'
                }
            }
        });

        if (destinoExistente) {
            return res.status(400).json({message: "Já existe um destino cadastro com este nome!"});
        }

        //2. Cadastr o destino
        const destino = await prisma.destino.create({
            data: {
                DES_NOME,
                DES_KM
            }
        });

        if (destino) {
            res.status(201).json(destino);
        }
    }
    catch (error) {
        res.status(500).json({message: `Erro ao cadastrar novo destino: ${error}`});
    }
};

//Rota para retornar os destinos
export const getDestino = async (req, res) => {
    try {
        const destinos = await prisma.destino.findMany({
            where: {
                DES_ATIVO: true
            },
            orderBy: {
                DES_ID: 'asc'
            }
        });

        if (!destinos) {
            return res.status(500).json({error: "Erro ao retornar destinos"});
        }

        return res.status(200).json(destinos);
    } catch (error) {
        return res.status(500).json({error: "Erro ao retornar destinos"});
    }
}

export const putDestino = async (req, res) => {
    const { id } = req.params
    const { DES_NOME, DES_KM } = req.body
    try {
        const parsedId = parseInt(id);

        //1. Valido se o destino existe e se esta ativo
        const destino = await prisma.destino.findUnique({
            where: {
                DES_ID: parsedId,
                DES_ATIVO: true
            }
        });

        //2. Se destino existir e estiver ativo, atualizo os dados dele
        if (destino) {
            const updateDestino = await prisma.destino.update({
                data: {
                    DES_NOME,
                    DES_KM
                },
                where: {
                    DES_ID: parsedId
                }
            });

            if (updateDestino) {
                return res.status(200).json(updateDestino)
            }
        }
        else {
            return res.status(400).json({message: `Destino não existe ou esta inativo`})
        }
    } catch (error) {
        return res.status(500).json({error: `Erro ao alterar dados do destino: ${error}`})
    }
};

export const deleteDestino = async (req, res) => {
    const { id } = req.params
    try {
        const parsedId = parseInt(id);

        //1. Valido se o destino existe e se esta ativo
        const destino = await prisma.destino.findUnique({
            where: {
                DES_ID: parsedId,
                DES_ATIVO: true
            }
        });

        //2. Se destino existir e estiver ativo, inativo ele
        if (destino) {
            const deleteDestino = await prisma.destino.update({
                data: {
                    DES_ATIVO: false
                },
                where: {
                    DES_ID: parsedId
                }
            });

            if (deleteDestino) {
                return res.status(200).json(deleteDestino)
            }
        }
        else {
            return res.status(400).json({message: `Destino não existe ou esta inativo`})
        }
    } catch (error) {
        return res.status(500).json({error: `Erro ao inativar destino: ${error}`})
    }
};