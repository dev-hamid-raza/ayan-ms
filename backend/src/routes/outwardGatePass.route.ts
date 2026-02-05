import { Router } from "express";
import { createGatePassIn, deleteGatePassIn, getAllGatePassIns, updateGatePassIn } from "../controllers/outwardGatePass.controller";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { authorizeModule } from "../middlewares/authorizeModule.middleware";
import { ACTIONS, MODULES } from "../config/accessControl";

const router = Router();

router.route("/create").post(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.CREATE), createGatePassIn);
router.route("/").get(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.READ), getAllGatePassIns);
router.route("/:id").post(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.UPDATE), updateGatePassIn).delete(verifyJWT, authorizeModule(MODULES.GATE_PASS_OUT,ACTIONS.DELETE), deleteGatePassIn);

export default router;