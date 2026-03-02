import mongoose, { Model, Schema } from "mongoose";

import { IEmployee } from "../../types/hrmTypes/employee.types";
import { Counter } from "../counter.model";

const employeeSchema = new Schema<IEmployee>({
    empCode: {
        type: Number,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    dateOfBirthday: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: String,
        required: true
    },
    dateOfConfirmation: {
        type: String,
        required: true
    },
    replace: {
        type: Number
    },
    cnic: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[0-9]{5}-[0-9]{7}-[0-9]$/,
            'Invalid CNIC format (e.g., 12345-1234567-1)'
        ]
    },
    religion: {
        type: String,
        required: true,
        enum: ['islam', 'christian', 'sikh', 'hindu']
    },
    martialStatus: {
        type: String,
        required: true,
        enum: ['married', 'single']
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    reference: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [
            /^(?:\+92|0)3[0-9]{9}$/,
            'Phone number must be a valid Pakistani mobile number (e.g., +923001234567 or 03001234567)'
        ]
    },
    emgPhoneNumber: {
        type: String,
        required: true,
        match: [
            /^(?:\+92|0)3[0-9]{9}$/,
            'Phone number must be a valid Pakistani mobile number (e.g., +923001234567 or 03001234567)'
        ]
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    tempAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'none']
    },
    onDuty: {
        type: Boolean,
        default: false
    },
    salary: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    overTimeAllowed: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'on duty',
        enum: ['on duty', 'terminated', 'quit']
    },
    salaryType: {
        type: String,
        required: true,
        enum: ['daily', 'monthly']
    },
    empType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeType',
        required: true,
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: true,
    },
    restDay: {
        type: Number,
        required: true
    },
    restQuota: {
        type: Number,
        default: 0
    },
    restUsed: {
        type: Number,
        default: 0
    },
    restMonth: String,
    isRandom: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true})


employeeSchema.pre('save', async function (next) {
    if (!this.isNew || this.empCode) return

    try {
        const counter = await Counter.findOneAndUpdate(
            { modelName: 'Employee' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )

        this.empCode = counter.seq
    } catch (error) {
        throw error
    }
})

export const Employee: Model<IEmployee> = mongoose.model<IEmployee>('Employee', employeeSchema)