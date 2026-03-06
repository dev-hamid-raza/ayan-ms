import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate.middleware";
import { getPunches, punchTime } from "../controllers/hrmController/attendance.controller";
import {
    createDepartment,
    deleteDepartment,
    departmentList,
    updateDepartment
} from "../controllers/hrmController/department.controller";
import {
    createDesignation,
    deleteDesignation,
    designationList,
    updateDesignation
} from "../controllers/hrmController/designation.controller";
import {
    createEmployee,
    employeesList,
    updateEmployee
} from "../controllers/hrmController/employee.controller";
import { upload } from "../middlewares/multer.middleware";
import {
    createEmpType,
    deleteEmpType,
    empTypeList,
    updateEmpType
} from "../controllers/hrmController/employeeType.controller";
import {
    deleteShift,
    shiftCreate,
    shiftList,
    updateShift
} from "../controllers/hrmController/shift.controller";

const router = Router()

router.use(verifyJWT)

// ========== attendance routes ===========
router.route('/attendance/punch').post(punchTime)
router.route('/attendance/get-punches').get(getPunches)

// ========== department routes ===========
router.route('/departments')
    .get(departmentList)
    .post(createDepartment)
router.route('/departments/:id')
    .post(updateDepartment)
    .delete(deleteDepartment)

// ========== designation routes ===========
router.route('/designations')
    .get(designationList)
    .post(createDesignation)
router.route('/designations/:id')
    .delete(deleteDesignation)
    .post(updateDesignation)

// ========== employee routes ===========
router.route('/employee').get(employeesList)
router.route('/employee/create').post(upload.single('image'), createEmployee)
router.route('/employee/update/:id').post(upload.single('image'), updateEmployee)

// ========== employeeType routes ===========
router.route('/emp-types')
    .get(empTypeList)
    .post(createEmpType)
router.route('/emp-types/:id')
    .delete(deleteEmpType)
    .post(updateEmpType)

// ========== shifts routes ===========
router.route('shift').get(shiftList)
router.route('shift/create').post(shiftCreate)
router.route('shift/delete/:id').delete(deleteShift)
router.route('shift/update/:id').post(updateShift)

export default router