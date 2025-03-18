const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({origin: '*'}));

//Rota para adicionar um destino
app.post("/destinos", async (req, res) => {
    const { DES_NOME } = req.body;

    try {
        const destino = await prisma.destino.create({data: { DES_NOME }});
        res.json(destino);
    }
    catch (error) {
        res.status(400).json({error: "Destino já existe!"});
    }
});

//Rota para registrar uma carona
app.post("/caronas", async (req, res) => {
    const { PAS_ID, DES_ID, CAR_DATA } = req.body;

    try {
        // 🔹 Converter a data para formato padrão "YYYY-MM-DD"
        const dataFormatada = new Date(CAR_DATA).toISOString().split("T")[0];

        // 🔹 Verificar se já existe uma carona com os mesmos dados
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

        // 🔹 Criar a carona se não houver duplicação
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
});

app.get("/caronas", async (req, res) => {
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
});

// Rota para calcular o valor proporcional de cada passageiro
app.get("/calculo", async (req, res) => {
    const { mes, ano, preco_gasolina, carro_km } = req.query;

    // Valores padrão caso não sejam informados na query
    const mediaCarro = carro_km ? parseFloat(carro_km) : 9.33;
    const precoGasolina = preco_gasolina ? parseFloat(preco_gasolina) : 6.29; // Valor fictício padrão
    const distancia_ufsm = 9.8; // Distância fixa de ida

    // Validar entrada
    if (!mes || !ano) {
        return res.status(400).json({ error: "Mês e ano são obrigatórios." });
    }

    const inicioMes = new Date(`${ano}-${mes}-01`);
    const fimMes = new Date(`${ano}-${mes}-31`);

    try {
        // 🔹 Buscar todas as caronas do mês informado
        const caronas = await prisma.carona.findMany({
            where: {
                CAR_DATA: {
                    gte: inicioMes,
                    lte: fimMes,
                },
            },
            include: {
                passageiro: true,
                destino: true,
            },
            orderBy: {
                CAR_DATA: "asc",
            },
        });

        // Organizar caronas por dia (quem pegou carona naquele dia)
        const caronasPorDia = {};

        caronas.forEach(({ passageiro, CAR_DATA }) => {
            const dataFormatada = CAR_DATA.toISOString().split("T")[0]; // "YYYY-MM-DD"
            if (!caronasPorDia[dataFormatada]) {
                caronasPorDia[dataFormatada] = new Set();
            }
            caronasPorDia[dataFormatada].add(passageiro.PAS_NOME);
        });

        // Adicionar o motorista a todas as viagens
        Object.keys(caronasPorDia).forEach((data) => {
            caronasPorDia[data].add("Jamil");
        });

        // Calcular o custo da gasolina para cada dia e dividir entre os passageiros da viagem
        const valoresIndividuais = {};

        Object.keys(caronasPorDia).forEach((data) => {
            const passageirosNaViagem = Array.from(caronasPorDia[data]);
            const numPessoasNaViagem = passageirosNaViagem.length;

            // Custo da viagem do dia
            const consumoPorKm = precoGasolina / mediaCarro;
            const custoViagemDia = consumoPorKm * (distancia_ufsm * 2); // Ida e volta

            // Dividir o custo entre todos os passageiros do dia
            const custoPorPessoa = custoViagemDia / numPessoasNaViagem;

            passageirosNaViagem.forEach((pessoa) => {
                if (!valoresIndividuais[pessoa]) {
                    valoresIndividuais[pessoa] = { viagens: 0, valorTotal: 0 };
                }
                valoresIndividuais[pessoa].viagens += 1;
                valoresIndividuais[pessoa].valorTotal += custoPorPessoa;
            });
        });

        // 🔹 Retornar o resultado final
        res.json({
            precoGasolina,
            mediaCarro,
            detalhesPassageiros: Object.keys(valoresIndividuais).reduce((acc, pessoa) => {
                acc[pessoa] = {
                    viagens: valoresIndividuais[pessoa].viagens,
                    valorTotal: parseFloat(valoresIndividuais[pessoa].valorTotal.toFixed(2)), // Arredondar para 2 casas decimais
                };
                return acc;
            }, {}),
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao calcular valores." });
    }
});



app.listen(3001, () => {
    console.log("Servidor no ar na porta 3001");
})