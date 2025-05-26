import prisma from "../db/client.js";

//Rota para retornar passageiros
export const getPassageiros =  async (req, res) => {

    try {
        const passageiros = await prisma.passageiro.findMany();
        res.status(200).json(passageiros);
    }
    catch (error) {
        res.status(500).json({error: "Erro ao buscar passageiros"});
    }
};

export const postPassageiro = async (req, res) => {
    const { nome } = req.body;
    try {
        const passageiro = await prisma.passageiro.create({
            data: {
                PAS_NOME: nome
            }
        });

        if (!passageiro) {
            return res.status(500).json({ error: "Erro ao cadastrar passageiro" });
        }

        return res.status(201).json(passageiro);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Erro ao cadastrar novo passageiro" });
    }
}
