import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { getPunches, punchTime } from "../controllers/hrmsController/attendance.controller";
import {
    createDepartment,
    deleteDepartment,
    departmentList,
    updateDepartment
} from "../controllers/hrmsController/department.controller";
import {
    createDesignation,
    deleteDesignation,
    designationList,
    updateDesignation
} from "../controllers/hrmsController/designation.controller";
import {
    createEmployee,
    employeesList,
    updateEmployee
} from "../controllers/hrmsController/employee.controller";
import { upload } from "../middlewares/multer.middleware";
import {
    createEmpType,
    deleteEmpType,
    empTypeList,
    updateEmpType
} from "../controllers/hrmsController/employeeType.controller";
import {
    deleteShift,
    shiftCreate,
    shiftList,
    updateShift
} from "../controllers/hrmsController/shift.controller";

const router = Router()

// ========== attendance routes ===========
router.route('/attendance/punch').post(verifyJWT, punchTime)
router.route('/attendance/get-punches').get(verifyJWT, getPunches)

// ========== department routes ===========
router.route('/department/create').post(verifyJWT, createDepartment)
router.route('/department/update/:id').post(verifyJWT, updateDepartment)
router.route('/department/delete/:id').delete(verifyJWT, deleteDepartment)
router.route('/department/').get(verifyJWT, departmentList)

// ========== designation routes ===========
router.route('/designation').get(verifyJWT, designationList)
router.route('/designation/create').post(verifyJWT, createDesignation)
router.route('/designation/delete/:id').delete(verifyJWT, deleteDesignation)
router.route('/designation/update/:id').post(verifyJWT, updateDesignation)

// ========== employee routes ===========
router.route('/employee').get(verifyJWT, employeesList)
router.route('/employee/create').post(verifyJWT, upload.single('image'), createEmployee)
router.route('/employee/update/:id').post(verifyJWT, upload.single('image'), updateEmployee)

// ========== employeeType routes ===========
router.route('/emp-type').get(verifyJWT, empTypeList)
router.route('/emp-type/create').post(verifyJWT, createEmpType)
router.route('/emp-type/delete/:id').delete(verifyJWT, deleteEmpType)
router.route('/emp-type/update/:id').post(verifyJWT, updateEmpType)

// ========== shifts routes ===========
router.route('shift').get(verifyJWT, shiftList)
router.route('shift/create').post(verifyJWT, shiftCreate)
router.route('shift/delete/:id').delete(verifyJWT, deleteShift)
router.route('shift/update/:id').post(verifyJWT, updateShift)

export default router