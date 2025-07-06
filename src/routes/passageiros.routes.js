import { Router } from 'express';
import { getPassageiros, postPassageiro, putPassageiro, deletePassageiro } from '../controllers/passageiros.controller.js';

const router = Router();

router.get("/", getPassageiros);
router.post("/", postPassageiro);
router.put("/:id", putPassageiro);
router.delete("/:id", deletePassageiro);

export default router;