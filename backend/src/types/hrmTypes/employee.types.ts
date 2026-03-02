import { Document, Types } from "mongoose";
import { IShift } from "./shift.types.js";

export interface IEmployee extends Document {
    empCode: number
    firstName: string
    lastName: string
    fatherName: string
    dateOfBirthday: string
    dateOfJoining: string,
    dateOfConfirmation: string
    replace?: number
    cnic: string
    religion: 'islam' | 'christian' | 'hindu' | 'sikh'
    martialStatus: 'married' | 'single'
    gender: 'male' | 'female' | 'other'
    reference: 'string'
    phoneNumber: string
    emgPhoneNumber: string
    permanentAddress: string
    tempAddress: string
    bloodGroup: string
    onDuty: boolean
    salary: number
    qualification: string
    overTimeAllowed: boolean
    status: 'on duty' | 'terminated' | 'quit'
    salaryType: 'daily' | 'monthly'
    empType: Types.ObjectId
    designation: Types.ObjectId
    department: Types.ObjectId
    shift: Types.ObjectId | IShift
    restDay: number
    restQuota: number
    restUsed: number
    restMonth: string
    isRandom: boolean
    image: string
}

export interface IEmployeeBody {
    firstName: string
    lastName: string
    fatherName: string
    dateOfBirthday: string
    dateOfJoining: string,
    dateOfConfirmation: string
    replace?: number
    cnic: string
    religion: 'islam' | 'christian' | 'hindu' | 'sikh'
    martialStatus: 'married' | 'single'
    gender: 'male' | 'female' | 'other'
    reference?: 'string'
    phoneNumber: string
    emgPhoneNumber: string
    permanentAddress: string
    tempAddress: string
    bloodGroup: string
    salary: number
    qualification: string
    overTimeAllowed: boolean
    salaryType: 'daily' | 'monthly'
    empType: Types.ObjectId
    designation: Types.ObjectId
    department: Types.ObjectId
    shift: Types.ObjectId | IShift
    restDay: number
    isRandom: boolean
}