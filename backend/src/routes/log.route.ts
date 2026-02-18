import { Router } from "express";
import { getLogs } from "../controllers/log.controller";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { authorizeRole } from "../middlewares/authorizeRole.middleware";
import { ROLES } from "../config/accessControl";

const router = Router()

router.route("/").get(verifyJWT, authorizeRole(ROLES.ADMIN), getLogs)

export default router