import prisma from "../db/client.js";

//Rota para retornar passageiros
export const getPassageiros =  async (req, res) => {

    try {
        const passageiros = await prisma.passageiro.findMany({
            where: {
                PAS_ATIVO: true
            }
        });
        res.status(200).json(passageiros);
    }
    catch (error) {
        res.status(500).json({error: "Erro ao buscar passageiros"});
    }
};

export const postPassageiro = async (req, res) => {
    const {PAS_NOME} = req.body;
    try {
        const passageiro = await prisma.passageiro.create({data: {
            PAS_NOME
        }});

        if (passageiro) {
            return res.status(201).json(passageiro);
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: `Erro ao cadastrar novo passageiro: ${error}`});
    }
};

export const putPassageiro = async (req, res) => {
    const {id} = req.params
    const {PAS_NOME} = req.body

    const parsedId = parseInt(id)

    try {
        //1. Verifico se o ID desse passageiro existe e esta ativo
        const passageiro = await prisma.passageiro.findUnique({
            where: {
                PAS_ID: parsedId,
                PAS_ATIVO: true
            }
        });

        //2. Existe e esta ativo. Então inativo o passageiro
        if (passageiro) {
            const updatePassageiro = await prisma.passageiro.update({
                data: {
                    PAS_NOME
                },
                where: {
                    PAS_ID: parsedId
                }
            });

            if (updatePassageiro) {
                return res.status(200).json(updatePassageiro)
            }
        }
        else {
            return res.status(400).json({message: `Passageiro não encontrado ou já inativo`})
        }
    } catch (error) {
        return res.status(500).json({message: `Erro ao alterar dados de passageiro: ${error}`})
    }
};

export const deletePassageiro = async (req, res) => {
    const {id} = req.params;

    const parsedId = parseInt(id)

    try {
        //1. Verifico se esse ID de passageiro existe e esta ativo
        const passageiro = await prisma.passageiro.findUnique({
            where: {
                PAS_ID: parsedId,
                PAS_ATIVO: true
            }
        });

        //2. Existe e esta ativo. Então inativo o passageiro
        if (passageiro) {
            const updatePassageiro = await prisma.passageiro.update({
                where: {
                    PAS_ID: parsedId
                },
                data: {
                    PAS_ATIVO: false
                }
            });

            if (updatePassageiro) {
                return res.status(200).json({message: `Passageiro inativado com sucesso`})
            }
        }
        else {
            return res.status(400).json({message: `Passageiro não existe ou já esta inativo`})
        }
    } catch (error) {
        return res.status(500).json({message: `Erro ao alterar passageiro: ${error}`})
    }

};