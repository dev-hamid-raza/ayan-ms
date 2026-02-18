import { Router } from "express";
import { getLogs } from "../controllers/log.controller.js";
import { verifyJWT } from "../middlewares/authenticate.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { ROLES } from "../config/accessControl.js";

const router = Router()

router.route("/").get(verifyJWT, authorizeRole(ROLES.ADMIN), getLogs)

export default router