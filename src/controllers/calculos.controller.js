import prisma from "../db/client.js";

// Rota para calcular o valor proporcional de cada passageiro
export const getCalculo = async (req, res) => {
    const { mes, ano, preco_gasolina, carro_km } = req.query;

    // Valores padrão caso não sejam informados na query
    const mediaCarro = carro_km ? parseFloat(carro_km) : 9.33;
    const precoGasolina = preco_gasolina ? parseFloat(preco_gasolina) : 6.29;

    // Validações
    if (!mes || !ano) {
        return res.status(400).json({ error: "Mês e ano são obrigatórios." });
    }

    const inicioMes = new Date(`${ano}-${mes}-01T00:00:00.000Z`);
    const ultimoDiaDoMes = new Date(parseInt(ano), parseInt(mes), 0).getDate();
    const fimMes = new Date(`${ano}-${mes}-${ultimoDiaDoMes}T23:59:59.999Z`);

    try {
        // Busco todas as caronas do mês informado
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

        const caronasPorDia = {}; // Para agrupar passageiros únicos por dia (para dividir o custo do carro do dia)
        const distanciasPorDia = {}; // Para armazenar a soma dos KM por dia
        const contagemViagensPassageiro = {}; // Para contar viagens individuais por passageiro

        // 1. Itero sobre CADA CARONA para agrupar por dia e somar KMs
        caronas.forEach(carona => {
            const dataFormatada = carona.CAR_DATA.toISOString().split("T")[0];

            if (!caronasPorDia[dataFormatada]) {
                caronasPorDia[dataFormatada] = new Set();
                distanciasPorDia[dataFormatada] = 0;
            }

            // Adiciono o passageiro ao Set para garantir unicidade no dia (para o custo do carro do dia)
            caronasPorDia[dataFormatada].add(carona.passageiro.PAS_NOME);

            // Somo os KM de TODAS as caronas do dia
            distanciasPorDia[dataFormatada] += parseFloat(carona.destino.DES_KM);

            // CONTADOR DE VIAGENS INDIVIDUAL POR PASSAGEIRO:
            if (!contagemViagensPassageiro[carona.passageiro.PAS_NOME]) {
                contagemViagensPassageiro[carona.passageiro.PAS_NOME] = 0;
            }
            contagemViagensPassageiro[carona.passageiro.PAS_NOME]++;
        });

        // 1. Inicializo a contagem de viagens do motorista (eu) recebebndo o número total de caronas
        contagemViagensPassageiro["Jamil"] = caronas.length;

        // 2. Adiciona (o motorista) aos sets de passageiros por dia.
        Object.keys(caronasPorDia).forEach((data) => {
            caronasPorDia[data].add("Jamil");
        });

        // 3. Calculo o custo da gasolina para cada dia e divido entre os passageiros da viagem
        const valoresIndividuais = {};

        if (!valoresIndividuais["Jamil"]) {
            valoresIndividuais["Jamil"] = { viagens: 0, valorTotal: 0 };
        }

        Object.keys(caronasPorDia).forEach((data) => {
            const passageirosNaViagem = Array.from(caronasPorDia[data]);
            const numPessoasNaViagem = passageirosNaViagem.length;

            const distanciaTotalDoDia = distanciasPorDia[data];
            const consumoPorKm = precoGasolina / mediaCarro;
            const custoViagemDia = consumoPorKm * (distanciaTotalDoDia * 2);

            const custoPorPessoa = custoViagemDia / numPessoasNaViagem;

            passageirosNaViagem.forEach((pessoa) => {
                if (!valoresIndividuais[pessoa]) {
                    valoresIndividuais[pessoa] = { viagens: 0, valorTotal: 0 };
                }
                valoresIndividuais[pessoa].valorTotal += custoPorPessoa;
            });
        });

        // 4. Resultado final
        res.status(200).json({
            precoGasolina,
            mediaCarro,
            detalhesPassageiros: Object.keys(valoresIndividuais).reduce((acc, pessoa) => {
                // Atribui a contagem de viagens correta para cada passageiro, incluindo eu Jamil.
                acc[pessoa] = {
                    viagens: contagemViagensPassageiro[pessoa] || 0, // Pega do objeto que conta caronas individuais
                    valorTotal: parseFloat(valoresIndividuais[pessoa].valorTotal.toFixed(2)),
                };
                return acc;
            }, {}),
        });
    } catch (error) {
        console.error("Erro no cálculo:", error);
        res.status(500).json({ error: `Erro ao calcular valores: ${error.message || error}` });
    }
};

export const getQuantidadesViagensDia = async (req, res) => {
    const { mes, ano, dia } = req.query;

    // Validações
    if (!mes || !ano || !dia) {
        return res.status(400).json({ error: "Mês, ano e dia são obrigatórios." });
    }

    const dataCompleta = new Date(`${ano}-${mes}-${dia} 00:00:00`);

    try {
        // Busco todas as caronas no dia informado
        const caronas = await prisma.carona.findMany({
            where: {
                CAR_DATA: {
                    equals: dataCompleta, // Início do dia
                },
            },
            include: {
                passageiro: true,
            },
            orderBy: {
                CAR_DATA: "asc",
            },
        });

        // Organizo as caronas por passageiro
        const quantidadesIndividuais = {};

        caronas.forEach(({ passageiro }) => {
            const nomePassageiro = passageiro.PAS_NOME;
            if (!quantidadesIndividuais[nomePassageiro]) {
                quantidadesIndividuais[nomePassageiro] = { viagens: 0 };
            }
            quantidadesIndividuais[nomePassageiro].viagens += 1;
        });

        // Resultado
        res.json({ quantidades: quantidadesIndividuais });
    } 
    
    catch (error) {
        console.error("Erro ao executar requisição:", error);
        res.status(500).json({ error: `Erro ao executar requisição: ${error.message}` });
    }
};