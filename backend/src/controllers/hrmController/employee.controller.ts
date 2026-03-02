
import { Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs"

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { Employee } from "../../models/hrmModels/employee.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { IEmployeeBody } from "../../types/hrmTypes/employee.types.js";
import { Shift } from "../../models/hrmModels/shift.model.js";
import { EmployeeType } from "../../models/hrmModels/employeeType.model.js";
import { Designation } from "../../models/hrmModels/designation.model.js";
import { Department } from "../../models/hrmModels/department.model.js";
import { calculateRestData } from "../../services/hrm/calculateRest.services.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! Create employee
export const createEmployee = asyncHandler(async (req: Request<{}, {}, IEmployeeBody>, res: Response) => {
    const {
        fatherName,
        lastName,
        firstName,
        shift,
        restDay,
        isRandom,
        bloodGroup,
        cnic,
        dateOfBirthday,
        dateOfConfirmation,
        dateOfJoining,
        department,
        designation,
        emgPhoneNumber,
        empType,
        gender,
        martialStatus,
        overTimeAllowed,
        permanentAddress,
        phoneNumber,
        qualification,
        religion,
        salary,
        salaryType,
        tempAddress,
        reference,
        replace
    } = req.body

    const requiredFields = {
        firstName,
        lastName,
        fatherName,
        shift,
        restDay,
        isRandom,
        bloodGroup,
        cnic,
        dateOfBirthday,
        dateOfConfirmation,
        dateOfJoining,
        department,
        designation,
        emgPhoneNumber,
        empType,
        gender,
        martialStatus,
        overTimeAllowed,
        permanentAddress,
        phoneNumber,
        qualification,
        religion,
        salary,
        salaryType,
        tempAddress,
    };
    const { restQuota, restUsed, restMonth } = calculateRestData(restDay, dateOfJoining)
    for (const [key, value] of Object.entries(requiredFields)) {
        if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
            throw new ApiError(400, `Missing or empty field: ${key}`)
        }
    }

    if (!req.file) {
        throw new ApiError(400, "Employee images is required")
    }

    const uploadedFilePath = path.join(__dirname, "../../uploads", req.file.filename);

    try {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

        const existingEmp = await Employee.findOne({ cnic }).select('empCode')

        if (existingEmp) {
            throw new ApiError(400, `This employee already exits at employee code ${existingEmp.empCode}`)
        }

        const empTypeDoc = await EmployeeType.findById(empType)

        if (!empTypeDoc) {
            throw new ApiError(400, "Invalid employee type id")
        }

        const designationDoc = await Designation.findById(designation)

        if (!designationDoc) {
            throw new ApiError(400, 'Invalid designation id')
        }

        const departmentDoc = await Department.findById(department)

        if (!departmentDoc) {
            throw new ApiError(400, 'Invalid department id')
        }

        const shiftDoc = await Shift.findById(shift)

        if (!shiftDoc) {
            throw new ApiError(400, 'Invalid shift id')
        }



        const employee = await Employee.create({
            ...requiredFields,
            reference,
            replace,
            restQuota,
            restUsed,
            restMonth,
            image: imageUrl
        })
        if (!employee) {
            throw new ApiError(500, 'Something went wring while creating employee')
        }

        return res
            .status(201)
            .json(
                new ApiResponse(201, employee, "Employee created successfully")
            )

    } catch (error) {
        if (fs.existsSync(uploadedFilePath)) {
            fs.unlinkSync(uploadedFilePath);
        }
        throw error
    }
})


//! Update employee
export const updateEmployee = asyncHandler(async (req: Request<{ id: string }, {}, IEmployeeBody>, res: Response) => {
    const employeeId = req.params.id;

    // Check if employee exists
    const existingEmp = await Employee.findById(employeeId);
    if (!existingEmp) {
        throw new ApiError(404, "Employee not found");
    }

    const {
        fatherName,
        lastName,
        firstName,
        shift,
        restDay,
        isRandom,
        bloodGroup,
        cnic,
        dateOfBirthday,
        dateOfConfirmation,
        dateOfJoining,
        department,
        designation,
        emgPhoneNumber,
        empType,
        gender,
        martialStatus,
        overTimeAllowed,
        permanentAddress,
        phoneNumber,
        qualification,
        religion,
        salary,
        salaryType,
        tempAddress,
        reference,
        replace,
    } = req.body;

    const requiredFields = {
        fatherName,
        lastName,
        firstName,
        shift,
        restDay,
        isRandom,
        bloodGroup,
        cnic,
        dateOfBirthday,
        dateOfConfirmation,
        dateOfJoining,
        department,
        designation,
        emgPhoneNumber,
        empType,
        gender,
        martialStatus,
        overTimeAllowed,
        permanentAddress,
        phoneNumber,
        qualification,
        religion,
        salary,
        salaryType,
        tempAddress,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
        if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
            throw new ApiError(400, `Missing or empty field: ${key}`);
        }
    }

    // Validate IDs
    const [empTypeDoc, designationDoc, departmentDoc, shiftDoc] = await Promise.all([
        EmployeeType.findById(empType),
        Designation.findById(designation),
        Department.findById(department),
        Shift.findById(shift),
    ]);

    if (!empTypeDoc) throw new ApiError(400, "Invalid employee type ID");
    if (!designationDoc) throw new ApiError(400, "Invalid designation ID");
    if (!departmentDoc) throw new ApiError(400, "Invalid department ID");
    if (!shiftDoc) throw new ApiError(400, "Invalid shift ID");

    // Calculate rest data
    const { restQuota, restUsed, restMonth } = calculateRestData(restDay, dateOfJoining);

    let imageUrl = existingEmp.image;

    // Update image if a new file is uploaded
    if (req.file) {
        const uploadedFilePath = path.join(__dirname, "../../uploads", req.file.filename);
        imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        // Delete old image if exists
        if (existingEmp.image) {
            const oldImagePath = path.join(__dirname, "../../uploads", path.basename(existingEmp.image));
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
    }

    const updatedEmp = await Employee.findByIdAndUpdate(
        employeeId,
        {
            ...requiredFields,
            reference,
            replace,
            restQuota,
            restUsed,
            restMonth,
            image: imageUrl,
        },
        { new: true }
    );

    if (!updatedEmp) {
        throw new ApiError(500, "Something went wrong while updating employee");
    }

    return res.status(200).json(new ApiResponse(200, updatedEmp, "Employee updated successfully"));
});


//! Employees list

export const employeesList = asyncHandler(async (req: Request, res: Response) => {

    const search = req.query.search as string;

    let query = {};
    if (search) {
        const empCodeNumber = Number(search);
        if (!isNaN(empCodeNumber)) {
            query = { empCode: empCodeNumber };
        }
    }

    const employees = await Employee.find(query)
        .select("-__v -createdAt -UpdatedAt")
        .populate("department", "departmentName")
        .populate('designation', 'designationName')
        .populate('shift', 'shiftName')
        .populate('empType', 'empType')

    if (!employees) {
        throw new ApiError(500, 'something went wrong')
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, employees, 'Employees list')
        )
})