import prisma from "../db/client.js";

// Rota para calcular o valor proporcional de cada passageiro
export const getCalculo = async (req, res) => {
    const { mes, ano, preco_gasolina, carro_km } = req.query;

    // Valores padrão caso não sejam informados na query
    const mediaCarro = carro_km ? parseFloat(carro_km) : 9.33;
    const precoGasolina = preco_gasolina ? parseFloat(preco_gasolina) : 6.54;
    const nomeMotorista = 'Jamil'

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

        //1. Agrupo passageiros por VIAGEM (não por dia)
        const viagensAgrupadas = {};
        const contagemViagensPassageiro = {};

        caronas.forEach(carona => {
            const chaveViagem = `${carona.CAR_DATA.toISOString()}-${carona.destino.DES_ID}`;

            if (!viagensAgrupadas[chaveViagem]) {
                viagensAgrupadas[chaveViagem] = {
                    passageiros: [],
                    distancia: parseFloat(carona.destino.DES_KM),
                };
            }
            
            const nomePassageiro = carona.passageiro.PAS_NOME;
            viagensAgrupadas[chaveViagem].passageiros.push(nomePassageiro);

            if (!contagemViagensPassageiro[nomePassageiro]) {
                contagemViagensPassageiro[nomePassageiro] = 0;
            }
            contagemViagensPassageiro[nomePassageiro]++;
        });

        // 2. Calculo o custo para cada viagem e distribuo entre os participantes
        const valoresIndividuais = {};

        //Itera sobre cada VIAGEM ÚNICA que aconteceu

        for (const chaveViagem in viagensAgrupadas) {
            const viagem = viagensAgrupadas[chaveViagem];

            //Adiciono eu na lista de participantes da viagem
            const participantes = [...viagem.passageiros, nomeMotorista];
            const numPessoasNaViagem = participantes.length;

            // Calcula o custo total da viagem
            const custoTotalDaViagem = (viagem.distancia / mediaCarro) * precoGasolina;

            const custoPorPessoa = custoTotalDaViagem / numPessoasNaViagem;

            // Adiciona o custo ao valor total de cada participante da viagem
            participantes.forEach(pessoa => {
                if (!valoresIndividuais[pessoa]) {
                    valoresIndividuais[pessoa] = {valorTotal: 0};
                }
                valoresIndividuais[pessoa].valorTotal += custoPorPessoa;
            })
        }

        //3. Contabilizo as viagens do motorista
        // O número de viagens do motorista é o número de viagens únicas que foram agrupadas
        contagemViagensPassageiro[nomeMotorista] = Object.keys(viagensAgrupadas).length;

        // 4. Formatar o resultado final
        todosOsNomes.forEach(pessoa => {
            detalhesPassageiros[pessoa] = {
                viagens: contagemViagensPassageiro[pessoa] || 0,
                valorTotal: parseFloat((valoresIndividuais[pessoa]?.valorTotal || 0).toFixed(2)),
            }
        });

        res.status(200).json({
            precoGasolina,
            mediaCarro,
            detalhesPassageiros,
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