import { Router } from "express";
import { adminResetUserPassword, checkAuthStatus, getAllUsers, loginUser, logoutUser, registerUser, updateMyPassword, updateUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/authenticate.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import { ROLES } from "../config/accessControl.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJWT, logoutUser);
router.route("/register").post(verifyJWT, authorizeRole(ROLES.ADMIN), registerUser);
router.route("/me/password").post(verifyJWT, updateMyPassword);
router.route("/:id").post(verifyJWT,authorizeRole(ROLES.ADMIN), updateUser);
router.route("/:id/password").post(verifyJWT,authorizeRole(ROLES.ADMIN), adminResetUserPassword);
router.route('/check-session').get(verifyJWT, checkAuthStatus)
router.route('/').get(verifyJWT, authorizeRole(ROLES.ADMIN), getAllUsers)

export default router;