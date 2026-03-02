import mongoose, { Model, Schema } from "mongoose";

import { IAttendance, IPunch } from "../../types/hrmTypes/attendance.types";

const punchSchema = new Schema<IPunch>({
    time: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ['IN', 'OUT'],
        required: true
    }
})

const attendanceSchema = new Schema<IAttendance>({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    punches: [punchSchema],
    date: {
        type: Date,
        required: true
    },
    checkInTime: Date,
    checkOutTime: Date,
    isLate: {
        type: Boolean,
        default: false
    },
    totalHoursWorked: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['A', 'P' , 'H', 'LIP', 'LIH', 'GH', 'L'],
        default: 'A'
    }
}, { timestamps: true })

export const Attendance: Model<IAttendance> = mongoose.model<IAttendance>('Attendance',attendanceSchema)