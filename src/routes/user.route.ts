import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateMyPassword } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { authorizeRole } from "../middlewares/authorizeRole";
import { ROLES } from "../config/accessControl";

const router = Router();

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJWT, logoutUser);
router.route("/register").post(verifyJWT, authorizeRole(ROLES.ADMIN), registerUser);
router.route("/me/password").patch(verifyJWT, updateMyPassword);

export default router;