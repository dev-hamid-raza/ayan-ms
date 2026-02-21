import { Router } from "express";
import {
    getAuditLogsForDocument,
    getAllAuditLogs,
    getAuditLogsByUser,
} from "../controllers/auditLog.controller.js";
import { verifyJWT } from "../middlewares/authenticate.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { ROLES } from "../config/accessControl.js";

const router = Router();

// Protect all audit log routes - only admin can view audit logs
router.use(verifyJWT);
router.use(authorizeRole(ROLES.ADMIN));

// Get audit logs for a specific model and document
router.route("/:modelName/:documentId").get(getAuditLogsForDocument);

// Get audit logs for a specific user
router.route("/user/:userId").get(getAuditLogsByUser);

// Get all audit logs with pagination
router.route("/").get(getAllAuditLogs);

export default router;
