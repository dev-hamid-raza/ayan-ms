import { Router } from "express";
import { createGatePassIn, deleteGatePassIn, getAllGatePassIns, updateGatePassIn } from "../controllers/gatePassIn.controller";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { authorizeModule } from "../middlewares/authorizeModule.middleware";
import { ACTIONS, MODULES } from "../config/accessControl";

const router = Router();

router.route("/create").post(verifyJWT, authorizeModule(MODULES.GATE_PASS_IN,ACTIONS.CREATE), createGatePassIn);
router.route("/").get(verifyJWT, authorizeModule(MODULES.GATE_PASS_IN,ACTIONS.READ), getAllGatePassIns);
router.route("/:id").post(verifyJWT, authorizeModule(MODULES.GATE_PASS_IN,ACTIONS.UPDATE), updateGatePassIn).delete(verifyJWT, authorizeModule(MODULES.GATE_PASS_IN,ACTIONS.DELETE), deleteGatePassIn);

export default router;