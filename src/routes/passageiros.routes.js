import { Router } from 'express';
import { getPassageiros, postPassageiro } from '../controllers/passageiros.controller.js';

const router = Router();

router.get("/", getPassageiros);
router.post("/", postPassageiro);

export default router;