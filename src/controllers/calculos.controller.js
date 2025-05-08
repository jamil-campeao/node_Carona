// Rota para calcular o valor proporcional de cada passageiro
export const getCalculo = async (req, res) => {
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

        // Organizo as caronas por dia (quem pegou carona naquele dia)
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

        // Calculo o custo da gasolina para cada dia e divido entre os passageiros da viagem
        const valoresIndividuais = {};

        Object.keys(caronasPorDia).forEach((data) => {
            const passageirosNaViagem = Array.from(caronasPorDia[data]);
            const numPessoasNaViagem = passageirosNaViagem.length;

            // Custo da viagem do dia
            const consumoPorKm = precoGasolina / mediaCarro;
            const custoViagemDia = consumoPorKm * (distancia_ufsm * 2); // Ida e volta

            // Divido o custo entre todos os passageiros que foram no dia
            const custoPorPessoa = custoViagemDia / numPessoasNaViagem;

            passageirosNaViagem.forEach((pessoa) => {
                if (!valoresIndividuais[pessoa]) {
                    valoresIndividuais[pessoa] = { viagens: 0, valorTotal: 0 };
                }
                valoresIndividuais[pessoa].viagens += 1;
                valoresIndividuais[pessoa].valorTotal += custoPorPessoa;
            });
        });

        // Resultado final
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