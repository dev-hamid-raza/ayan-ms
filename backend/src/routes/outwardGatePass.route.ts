import { Router } from "express";
import { createOutwardGatePass, deleteOutwardGatePass, getAllOutwardGatePasses, getOutwardGatePass, updateOutwardGatePass } from "../controllers/outwardGatePass.controller";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { authorizeModule } from "../middlewares/authorizeModule.middleware";
import { ACTIONS, MODULES } from "../config/accessControl";

const router = Router();

router.route("/create").post(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.CREATE), createOutwardGatePass);
router.route("/").get(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.READ), getAllOutwardGatePasses);
router.route("/:id")
    .get(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.READ), getOutwardGatePass)
    .post(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.UPDATE), updateOutwardGatePass)
    .delete(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.DELETE), deleteOutwardGatePass);

export default router;