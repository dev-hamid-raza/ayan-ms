import { Types } from "mongoose";

import { getMinutesFromDate } from "../../utils/time.js";
import { Attendance } from "../../models/hrmModels/attendance.model.js";
import { Employee } from "../../models/hrmModels/employee.model.js";
import { IAttendance } from "../../types/hrmTypes/attendance.types.js";
import { IEmployee } from "../../types/hrmTypes/employee.types.js";
import { IShift } from "../../types/hrmTypes/shift.types.js";

export const updateAttendanceSummary = (att: IAttendance): void => {
    const punches = att.punches.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    const emp = att.employee as IEmployee
    const shift = emp.shift as IShift

    const { lateInRelaxation, totalShiftHours, startTime } = shift

    if (!punches.length) {
        att.status = 'A'
        return
    }

    const firstCheckIn = punches[0].time
    //* Calculate the total hours
    const lastCheckIn = punches[punches.length - 2].time
    const lastCheckOut = punches[punches.length - 1].time

    const totalMs = lastCheckOut.getTime() - lastCheckIn.getTime()
    const hoursWorked = +(totalMs / 1000 / 60 / 60).toFixed(2)
    const totalHours = att.totalHoursWorked + hoursWorked

    att.totalHoursWorked = totalHours

    //* Check is late or not
    const checkIn = getMinutesFromDate(firstCheckIn)
    att.isLate = checkIn > lateInRelaxation

    //* Set attendance status
    if (totalHours > (totalShiftHours - 1) && att.isLate) {
        att.status = "LIP"
    }

    if (totalHours > (totalShiftHours - 1) && !att.isLate) {
        att.status = "P"
    }

    if (totalHours > (totalShiftHours / 2 - 0.5) && totalHours < (totalShiftHours - 1) && att.isLate) {
        att.status = "LIH"
    }

    if (totalHours > (totalShiftHours / 2 - 0.5) && totalHours < (totalShiftHours - 1) && !att.isLate) {
        att.status = "H"
    }
}



export const markDailyAttendanceStatus = async () => {
    try {
        const dated = '2025-07-08';
        const dayOfWeek = new Date(dated).getDay();

        const attendance = await Attendance.find({ date: dated }, 'employee');
        const attendedEmployeeIds = new Set(attendance.map(att => att.employee.toString()));

        const employees = await Employee.find(
            { onDuty: false },
            '_id restDay restQuota restUsed isRandom'
        ) as { _id: Types.ObjectId, restDay: number, restQuota: number, restUsed: number, isRandom: boolean }[];

        const attendanceRecords = [];
        const restUsedUpdates = [];

        for (const emp of employees) {
            if (attendedEmployeeIds.has(emp._id.toString())) continue;

            let status: 'A' | 'L' = 'A';
            
            if(emp.isRandom) {
                if (emp.restUsed < emp.restQuota) {
                    status = 'L';
                    // Prepare restUsed increment
                    restUsedUpdates.push({
                        updateOne: {
                            filter: { _id: emp._id },
                            update: { $inc: { restUsed: 1 } }
                        }
                    });
                }
            } else {
                if (dayOfWeek === emp.restDay && emp.restUsed < emp.restQuota) {
                    status = 'L';
                    // Prepare restUsed increment
                    restUsedUpdates.push({
                        updateOne: {
                            filter: { _id: emp._id },
                            update: { $inc: { restUsed: 1 } }
                        }
                    });
                }
            }


            attendanceRecords.push({
                employee: emp._id,
                date: dated,
                status
            });
        }

        // Insert attendance records
        if (attendanceRecords.length > 0) {
            await Attendance.insertMany(attendanceRecords)
        }

        // Bulk update restUsed in Employee collection
        if (restUsedUpdates.length > 0) {
            await Employee.bulkWrite(restUsedUpdates)
        }

        console.log('Attendance marked successfully.')
    } catch (error) {
        console.error('Failed to mark attendance:', error)
    }
}