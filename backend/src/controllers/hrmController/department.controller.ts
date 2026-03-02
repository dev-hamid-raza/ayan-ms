import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { Department } from "../../models/hrmModels/department.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Employee } from "../../models/hrmModels/employee.model.js";

//! Create Department

export const createDepartment = asyncHandler( async (req:Request<{},{},{departmentName:string}>, res:Response) => {
    const {departmentName} = req.body
    if(!departmentName) {
        throw new ApiError(400,'Department name is required')
    }
    setInterval(() => {}, 10000)
    const existingDepartment = await Department.findOne({departmentName})

    if(existingDepartment) {
        throw new ApiError(400, 'Department already exist')
    }

    const department = await Department.create({departmentName})

    const createdDepartment = await Department.findById(department._id)

    if(!createdDepartment) {
        throw new ApiError(500, "Something went wrong while creating the department")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201,{department:createdDepartment},"Department created successfully")
        )
})

//! Delete department

export const deleteDepartment = asyncHandler( async (req: Request,res:Response) => {
    const {id} = req.params

    if(!id) {
        throw new ApiError(400,'Department id is required')
    }

    const department = await Department.findById(id)

    if(!department) {
        throw new ApiError(404, 'Department not found')
    }

    const emp = await Employee.findOne({department: id})

    if(emp) {
        throw new ApiError(400, "Unable to delete because it is associated with employee. You need to change it before deleting")
    }

    await department.deleteOne()

    return res
        .status(200)
        .json(
            new ApiResponse(200,{},'Department deleted successfully')
        )
})

//! Update department 

export const updateDepartment = asyncHandler( async(req: Request<{id:string}, {}, {departmentName:string}>, res: Response) => {
    const {id} = req.params
    const {departmentName} = req.body

    if(!id) {
        throw new ApiError(400,'Department id is required')
    }

    if(!departmentName) {
        throw new ApiError(400, "Department name is required")
    }

    const existingDepartment = await Department.findOne({departmentName})

    if(existingDepartment) {
        throw new ApiError(400, 'Department already exist')
    }
    
    const department = await Department.findById(id)

    if(!department) {
        throw new ApiError(404,'Department not found')
    }

    department.departmentName = departmentName

    await department.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200,department,'Department is change successfully')
        )
})

//! Departments list

export const departmentList = asyncHandler(async (req: Request, res: Response) => {
	const search = req.query.search as string;

	let query = {};
	if (search) {
		query = {
			departmentName: { $regex: search, $options: "i" },
		};
	}

	const departments = await Department.find(query).select("_id departmentName");

	if (!departments) {
		throw new ApiError(500, "Something went wrong");
	}

	return res.status(200).json(new ApiResponse(200, departments, "Departments list"));
});
