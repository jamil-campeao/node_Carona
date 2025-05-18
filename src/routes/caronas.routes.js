import { Router } from 'express';
import { getCaronas, postCaronas, getCaronasDoDia } from '../controllers/caronas.controller.js';

const router = Router();

router.get("/", getCaronas);
router.get("/dia/:data", getCaronasDoDia);
router.post("/", postCaronas);

export default router;