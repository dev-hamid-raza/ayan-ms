import mongoose, { Model, Schema } from "mongoose";

import { IShift } from "../../types/hrmsTypes/shift.types";

const shiftSchema = new Schema<IShift>({
    shiftName: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    lateInRelaxation: {
        type: Number,
        required: true
    },
    earlyOutRelaxation: {
        type: Number,
        required: true,
    },
    brakeStart: Number,
    brakeEnd: Number,
    totalShiftHours: Number,
}, {timestamps: true})

export const Shift: Model<IShift> = mongoose.model<IShift>('Shift', shiftSchema)