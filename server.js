import app from "./src/app.js";
import "dotenv/config";

const PORT = process.env.port || 3001;

app.listen(3001, () => {
    console.log("Servidor no ar na porta 3001");
})