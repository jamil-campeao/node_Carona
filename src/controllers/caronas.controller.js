import prisma from '../db/client.js';

//Rota para registrar uma carona
export const postCaronas = async (req, res) => {
    const { PAS_ID, DES_ID, CAR_DATA } = req.body;

    try {
        // Converto a data para formato padrão "YYYY-MM-DD"
        const dataFormatada = new Date(CAR_DATA).toISOString().split("T")[0];

        // Verifico se já existe uma carona com os mesmos dados
        const caronaExistente = await prisma.carona.findFirst({
            where: {
                PAS_ID: PAS_ID,
                DES_ID: DES_ID,
                CAR_DATA: {
                    gte: new Date(`${dataFormatada}T00:00:00.000Z`),
                    lte: new Date(`${dataFormatada}T23:59:59.999Z`),
                },
            },
        });

        if (caronaExistente) {
            return res.status(400).json({ error: "Carona já registrada para este passageiro, destino e dia!" });
        }

        // Crio a carona se não houver duplicação
        const carona = await prisma.carona.create({
            data: {
                PAS_ID,
                DES_ID,
                CAR_DATA: new Date(CAR_DATA),
            },
        });

        res.json(carona);
    } catch (error) {
        console.error("Erro ao registrar a carona:", error);
        res.status(500).json({ error: "Erro ao registrar a carona." });
    }
};

export const getCaronas =  async (req, res) => {
    const { mes, ano } = req.query;

    const inicioMes = new Date(`${ano}-${mes}-01`);
    const fimMes = new Date(`${ano}-${mes + 1}-01`);

    const caronas = await prisma.carona.findMany({
        where: {
            CAR_DATA: {
                gte: inicioMes,
                lt: fimMes,
            },
        },
        include: {
            passageiro: true,
            destino: true,
        },
    });

    //Agrupo os dados por destino
    const resultado = {};
    caronas.forEach(({passageiro, destino}) => {
        if (!resultado[destino.DES_NOME]) resultado[destino.DES_NOME] = {};
        if (!resultado[destino.DES_NOME][passageiro.PAS_NOME]) resultado[destino.DES_NOME][passageiro.PAS_NOME] = 0;
        resultado[destino.DES_NOME][passageiro.PAS_NOME] += 1;
    });

    res.json(resultado);
};