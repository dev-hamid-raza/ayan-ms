import { Router } from "express";
import { adminResetUserPassword, checkAuthStatus, loginUser, logoutUser, registerUser, updateMyPassword, updateUser } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { authorizeRole } from "../middlewares/authorizeRole";
import { ROLES } from "../config/accessControl";

const router = Router();

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJWT, logoutUser);
router.route("/register").post(verifyJWT, authorizeRole(ROLES.ADMIN), registerUser);
router.route("/me/password").patch(verifyJWT, updateMyPassword);
router.route("/:id").put(verifyJWT,authorizeRole(ROLES.ADMIN), updateUser);
router.route("/:id/password").patch(verifyJWT,authorizeRole(ROLES.ADMIN), adminResetUserPassword);
router.route('/check-session').get(verifyJWT, checkAuthStatus)

export default router;