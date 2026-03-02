import mongoose, { Model, Schema } from "mongoose";

import { IEmployeeType } from "../../types/hrmsTypes/employeeType.types";

const employeeTypeSchema = new Schema<IEmployeeType>({
    empType: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})


export const EmployeeType: Model<IEmployeeType> = mongoose.model<IEmployeeType>('EmployeeType', employeeTypeSchema)