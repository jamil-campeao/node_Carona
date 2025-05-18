import express from 'express';
import routes from './routes/index.routes.js';
import prisma from "./db/client.js";
import cors from 'cors';

function fValidaConexao() {
    try {
        prisma.$connect();
        console.log("Conexão com o banco realizada com sucesso");
    } catch (error) {
        console.error("Erro de conexão com o banco de dados: ", error);
        process.exit(1);
    }
}

fValidaConexao();

const app = express();

app.use(express.json());

app.use(cors({
    origin: "https://controle-de-caronas.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(routes)

export default app;