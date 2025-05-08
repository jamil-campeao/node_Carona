import { Router } from 'express';
import { postDestino } from '../controllers/destinos.controller.js';

const router = Router();

router.use("/", postDestino);

export default router;