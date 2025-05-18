import { Router } from 'express';
import { getDestino, postDestino } from '../controllers/destinos.controller.js';

const router = Router();

router.post("/", postDestino);
router.get("/", getDestino);

export default router;