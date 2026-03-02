import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { EmployeeType } from "../../models/hrmModels/employeeType.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Employee } from "../../models/hrmModels/employee.model.js";

export const createEmpType = asyncHandler(async (req:Request<{}, {}, {empType: string}>, res: Response) => {
    const { empType } = req.body

    if(!empType) {
        throw new ApiError(400, 'Employee Type is required')
    }

    const existingEmpType = await EmployeeType.findOne({empType})

    if(existingEmpType) {
        throw new ApiError(400,'This employee type is already exits')
    }

    const createdEmpType = EmployeeType.create({empType})

    if(!createdEmpType) {
        throw new ApiError(500,'Something went wrong while creating employee type')
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201,{createdEmpType}, 'Employee type created successfully')
        )
})

//! Delete employee type

export const deleteEmpType = asyncHandler(async (req:Request, res: Response) => {
    const {id} = req.params

    if(!id) {
        throw new ApiError(400, "Employee type id is required")
    }

    const empType = await EmployeeType.findById(id)

    if(!empType) {
        throw new ApiError(404,"Employee type not found")
    }

    const emp = await Employee.findOne({empType: id})

    if(emp) {
        throw new ApiError(400, "Unable to delete because it is associated with employee. You need to change it before deleting")
    }

    await empType.deleteOne()

    return res
        .status(200)
        .json(
            new ApiResponse(200,{}, "Employee type delete successfully")
        )
})

//! Update department 

export const updateEmpType = asyncHandler( async(req: Request<{id:string}, {}, {empType:string}>, res: Response) => {
    const {id} = req.params
    const {empType} = req.body

    if(!id) {
        throw new ApiError(400,'Employee type id is required')
    }

    if(!empType) {
        throw new ApiError(400, "Employee type is required")
    }

    const existingEmpType = await EmployeeType.findOne({empType})

    if(existingEmpType) {
        throw new ApiError(400, 'Employee type already exist')
    }
    
    const employeeType = await EmployeeType.findById(id)

    if(!employeeType) {
        throw new ApiError(404,'Employee type not found')
    }

    employeeType.empType = empType

    await employeeType.save()

    return res
        .status(200)
        .json(
            new ApiResponse(200,{},'Employee type name is change successfully')
        )
})

//! Departments list

export const empTypeList = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string;

    let query = {};
    if (search) {
        query = {
            empType: { $regex: search, $options: "i" },
        };
    }

    const empTypes = await EmployeeType.find(query).select("_id empType");

    if (!empTypes) {
        throw new ApiError(500, "Something went wrong");
    }

    return res.status(200).json(new ApiResponse(200, empTypes, "Employee type list"));
});
