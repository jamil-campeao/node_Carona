import { Router } from "express";
import caronasRoutes from "./caronas.routes.js";
import passageirosRoutes from "./passageiros.routes.js";
import destinosRoutes from "./destinos.routes.js";
import calculosRoutes from "./calculos.routes.js";

const router = Router();

router.use("/caronas", caronasRoutes);
router.use("/passageiros", passageirosRoutes);
router.use("/destinos", destinosRoutes);
router.use("/calculo", calculosRoutes);

export default router;