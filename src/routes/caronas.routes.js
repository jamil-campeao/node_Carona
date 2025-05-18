import { Router } from 'express';
import { getCaronas, postCaronas, getCaronasDoDia, deleteCarona } from '../controllers/caronas.controller.js';

const router = Router();

router.delete("/:id", deleteCarona);
router.get("/", getCaronas);
router.get("/dia/:data", getCaronasDoDia);
router.post("/", postCaronas);

export default router;