import { Router } from 'express';
import { getCaronas, postCaronas } from '../controllers/caronas.controller.js';

const router = Router();

router.get("/", getCaronas);
router.post("/", postCaronas);

export default router;