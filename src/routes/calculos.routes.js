import { Router } from 'express';
import { getCalculo, getQuantidadesViagensDia } from '../controllers/calculos.controller.js';

const router = Router();

router.get("/", getCalculo);
router.get("/quantidadesdia", getQuantidadesViagensDia);

export default router;