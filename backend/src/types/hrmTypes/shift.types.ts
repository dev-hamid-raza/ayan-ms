import { Document } from "mongoose";

export interface IShift extends Document {
    shiftName: string
    startTime: number
    endTime: number
    lateInRelaxation: number
    earlyOutRelaxation: number
    brakeStart: number
    brakeEnd: number
    totalShiftHours: number
}

export interface ShiftRequestBody {
    shiftName: string
    startTime: string
    endTime: string
    lateInRelaxation: string
    earlyOutRelaxation: string
    brakeStart: string
    brakeEnd: string
}