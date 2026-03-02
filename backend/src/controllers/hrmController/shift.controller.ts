import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { ShiftRequestBody } from "../../types/hrmTypes/shift.types.js";
import { ApiError } from "../../utils/ApiError.js";
import { calculateHours, minutesToTimeString, timeStringToMinutes } from "../../utils/time.js";
import { Shift } from "../../models/hrmModels/shift.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Employee } from "../../models/hrmModels/employee.model.js";

export const shiftCreate = asyncHandler(async (req: Request<{}, {}, ShiftRequestBody>, res: Response) => {
    const { startTime, endTime, lateInRelaxation, earlyOutRelaxation, brakeEnd, brakeStart, shiftName } = req.body

    if (
        [startTime, endTime, lateInRelaxation, earlyOutRelaxation, brakeStart, brakeEnd, shiftName].some((field) => typeof field !== 'string' || field?.trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    const existingShift = await Shift.findOne({ shiftName })

    if (existingShift) {
        throw new ApiError(400, 'This name is already exits')
    }

    const startTimeInMinutes = timeStringToMinutes(startTime)
    const endTimeInMinutes = timeStringToMinutes(endTime)
    const lateInRelaxationInMinutes = timeStringToMinutes(lateInRelaxation)
    const earlyOutRelaxationInMinutes = timeStringToMinutes(earlyOutRelaxation)
    const brakeStartInMinutes = timeStringToMinutes(brakeStart)
    const brakeEndInMinutes = timeStringToMinutes(brakeEnd)

    const brakeHours = calculateHours(brakeStartInMinutes, brakeEndInMinutes)
    const shiftHours = calculateHours(startTimeInMinutes, endTimeInMinutes)

    const totalShiftHours = shiftHours - brakeHours

    const shift = await Shift.create({
        startTime: startTimeInMinutes,
        endTime: endTimeInMinutes,
        lateInRelaxation: lateInRelaxationInMinutes,
        earlyOutRelaxation: earlyOutRelaxationInMinutes,
        brakeStart: brakeStartInMinutes,
        brakeEnd: brakeEndInMinutes,
        shiftName,
        totalShiftHours
    })


    if (!shift) {
        throw new ApiError(500, 'Something went wrong while creating shift')
    }


    return res
        .status(201)
        .json(
            new ApiResponse(201, {}, "Shift created successfully")
        )
})

//! update shift
export const updateShift = asyncHandler(async (req: Request<{ id: string }, {}, ShiftRequestBody>, res: Response) => {
    const { id } = req.params;
    const {
        startTime,
        endTime,
        lateInRelaxation,
        earlyOutRelaxation,
        brakeStart,
        brakeEnd,
        shiftName
    } = req.body;

    if (
        [startTime, endTime, lateInRelaxation, earlyOutRelaxation, brakeStart, brakeEnd, shiftName].some(
            (field) => typeof field !== 'string' || field.trim() === ''
        )
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingShift = await Shift.findById(id);
    if (!existingShift) {
        throw new ApiError(404, 'Shift not found');
    }

    const duplicateShift = await Shift.findOne({
        shiftName,
        _id: { $ne: id }
    });

    if (duplicateShift) {
        throw new ApiError(400, 'This shift name already exists');
    }

    const startTimeInMinutes = timeStringToMinutes(startTime);
    const endTimeInMinutes = timeStringToMinutes(endTime);
    const lateInRelaxationInMinutes = timeStringToMinutes(lateInRelaxation);
    const earlyOutRelaxationInMinutes = timeStringToMinutes(earlyOutRelaxation);
    const brakeStartInMinutes = timeStringToMinutes(brakeStart);
    const brakeEndInMinutes = timeStringToMinutes(brakeEnd);

    const brakeHours = calculateHours(brakeStartInMinutes, brakeEndInMinutes);
    const shiftHours = calculateHours(startTimeInMinutes, endTimeInMinutes);
    const totalShiftHours = shiftHours - brakeHours;

    existingShift.set({
        startTime: startTimeInMinutes,
        endTime: endTimeInMinutes,
        lateInRelaxation: lateInRelaxationInMinutes,
        earlyOutRelaxation: earlyOutRelaxationInMinutes,
        brakeStart: brakeStartInMinutes,
        brakeEnd: brakeEndInMinutes,
        shiftName,
        totalShiftHours
    });

    await existingShift.save();

    return res.status(200).json(
        new ApiResponse(200, {}, 'Shift updated successfully')
    );
});


//! get list
export const shiftList = asyncHandler(async (req: Request, res: Response) => {
    const search = req.query.search as string;

    let query = {};
    if (search) {
        query = {
            shiftName: { $regex: search, $options: "i" },
        };
    }

    const shifts = await Shift.find(query).select("-createdAt -updatedAt -__v");

    if (!shifts) {
        throw new ApiError(500, "Something went wrong");
    }

    const formattedShifts = shifts.map(shift => ({
        ...shift.toObject(),
        startTime: minutesToTimeString(shift.startTime),
        endTime: minutesToTimeString(shift.endTime),
        lateInRelaxation: minutesToTimeString(shift.lateInRelaxation),
        earlyOutRelaxation: minutesToTimeString(shift.earlyOutRelaxation),
        brakeStart: minutesToTimeString(shift.brakeStart),
        brakeEnd: minutesToTimeString(shift.brakeEnd),
    }));

    return res.status(200).json(new ApiResponse(200, formattedShifts, "shift list"));
});


//! Delete the shift

export const deleteShift = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        throw new ApiError(400, 'Shift id is required')
    }

    const shift = await Shift.findById(id)

    if (!shift) {
        throw new ApiError(404, 'Shift not found')
    }

    const emp = await Employee.findOne({shift: id})

    if(emp) {
        throw new ApiError(400, "Unable to delete because it is associated with employee. You need to change it before deleting")
    }

    await shift.deleteOne()

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, 'Shift deleted successfully')
        )
})