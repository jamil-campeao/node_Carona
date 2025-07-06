import { Router } from 'express';
import { getDestino, postDestino, putDestino, deleteDestino } from '../controllers/destinos.controller.js';

const router = Router();

router.post("/", postDestino);
router.get("/", getDestino);
router.put("/:id", putDestino);
router.delete("/:id", deleteDestino);

export default router;