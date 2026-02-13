import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { IOutwardGatePassRequestBody, IOutwardGatePassItems } from "../types/outwardGatePass.types.js";
import { ApiError } from "../utils/ApiError.js";
import { OutwardGatePass } from "../models/outwardGatePass.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Function to validate the items array
const validateItems = (items: IOutwardGatePassItems[]) => {
    if (!Array.isArray(items) || items.length === 0) {
        throw new ApiError(400, "Items array cannot be empty");
    }

    if (items.length > 12) {
        throw new ApiError(400, "Items array cannot exceed 12 items");
    }

    items.forEach((item, index) => {
        if (!item.description || typeof item.description !== "string") {
            throw new ApiError(400, `Item at index ${index} is missing a valid description`);
        }
        if (typeof item.pack !== "number" || item.pack <= 0) {
            throw new ApiError(400, `Item at index ${index} must have a valid pack (positive number)`);
        }
        if (!item.unit || typeof item.unit !== "string") {
            throw new ApiError(400, `Item at index ${index} is missing a valid unit`);
        }
        if (typeof item.quantity !== "number" || item.quantity <= 0) {
            throw new ApiError(400, `Item at index ${index} must have a valid quantity (positive number)`);
        }
        if (item.netWeight && typeof item.netWeight !== "number") {
            throw new ApiError(400, `Item at index ${index} must have a valid netWeight`);
        }
    });
};

// Function to validate gate pass in payload
const validateOutwardGatePassPayload = (
    data: Partial<IOutwardGatePassRequestBody>,
    options: { requireAll: boolean }
) => {
    const { requireAll } = options;

    if (!data || typeof data !== "object") {
        throw new ApiError(400, "Request body is missing");
    }

    if (requireAll) {
        if (!data.purpose || typeof data.purpose !== "string") {
            throw new ApiError(400, "Purpose is required and must be a string");
        }
        if (!data.type || typeof data.type !== "string") {
            throw new ApiError(400, "Type is required and must be a string");
        }
        if (!data.vehicleNumber || typeof data.vehicleNumber !== "string") {
            throw new ApiError(400, "Vehicle number is required and must be a string");
        }
        if (!data.nameTo || typeof data.nameTo !== "string") {
            throw new ApiError(400, "NameTo is required and must be a string");
        }
        if (!data.issuedBy || typeof data.issuedBy !== "string") {
            throw new ApiError(400, "IssuedBy is required and must be a string");
        }
        if (!data.date) {
            throw new ApiError(400, "Date is required");
        }
        if (!data.mobileNumber || !/^[0-9]{11}$/.test(data.mobileNumber)) {
            throw new ApiError(400, "Mobile number is required and must be a valid 10-digit number");
        }
    } else {
        if (typeof data.purpose !== "undefined" && (typeof data.purpose !== "string" || data.purpose.trim() === "")) {
            throw new ApiError(400, "Purpose must be a non-empty string");
        }
        if (typeof data.type !== "undefined" && (typeof data.type !== "string" || data.type.trim() === "")) {
            throw new ApiError(400, "Type must be a non-empty string");
        }
        if (typeof data.vehicleNumber !== "undefined" && (typeof data.vehicleNumber !== "string" || data.vehicleNumber.trim() === "")) {
            throw new ApiError(400, "Vehicle number must be a non-empty string");
        }
        if (typeof data.nameTo !== "undefined" && (typeof data.nameTo !== "string" || data.nameTo.trim() === "")) {
            throw new ApiError(400, "NameTo must be a non-empty string");
        }
        if (typeof data.issuedBy !== "undefined" && (typeof data.issuedBy !== "string" || data.issuedBy.trim() === "")) {
            throw new ApiError(400, "IssuedBy must be a non-empty string");
        }
        if (typeof data.date !== "undefined") {
            const dateValue = new Date(data.date as unknown as string);
            if (Number.isNaN(dateValue.getTime())) {
                throw new ApiError(400, "Date must be a valid date");
            }
        }
        if (typeof data.mobileNumber !== "undefined" && !/^[0-9]{11}$/.test(data.mobileNumber)) {
            throw new ApiError(400, "Mobile number must be a valid 10-digit number");
        }
    }

    if (typeof data.items !== "undefined") {
        validateItems(data.items as IOutwardGatePassItems[]);
    } else if (requireAll) {
        throw new ApiError(400, "Items array cannot be empty");
    }

    if (data.containerNumber && typeof data.containerNumber !== "string") {
        throw new ApiError(400, "Container number must be a string if provided");
    }
};


// Function to validate the gate pass in object


export const createOutwardGatePass = asyncHandler(async (req: Request<{}, {}, IOutwardGatePassRequestBody>, res: Response) => {
    const payload = req.body;
    validateOutwardGatePassPayload(payload, { requireAll: true });

    const parsedDate = new Date(payload.date as unknown as string);
    payload.date = parsedDate as unknown as Date;


    const outwardGatePass = new OutwardGatePass(payload);

        await outwardGatePass.save();
        return res
        .status(201)
        .json(
            new ApiResponse(201, outwardGatePass, "Gate Pass In created successfully")
        );
});

export const updateOutwardGatePass = asyncHandler(async (
    req: Request<{ id: string }, {}, Partial<IOutwardGatePassRequestBody>>,
    res: Response
) => {
    const { id } = req.params;
    const payload = req.body;

    if(!payload || typeof payload !== "object") {
        throw new ApiError(400, "Request body is missing");
    }

    const allowedKeys = [
        "purpose",
        "type",
        "vehicleNumber",
        "nameTo",
        "items",
        "issuedBy",
        "date",
        "mobileNumber",
        "containerNumber"
    ];

    const payloadKeys = Object.keys(payload);
    if (payloadKeys.length === 0) {
        throw new ApiError(400, "At least one field is required");
    }

    const invalidKeys = payloadKeys.filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        throw new ApiError(400, `Invalid field(s): ${invalidKeys.join(", ")}`);
    }

    validateOutwardGatePassPayload(payload, { requireAll: false });

    if (typeof payload.date !== "undefined") {
        payload.date = new Date(payload.date) ;
    }

    const outwardGatePass = await OutwardGatePass.findById(id);
    if (!outwardGatePass) {
        throw new ApiError(404, "Gate Pass In not found");
    }

    if (typeof payload.purpose === "string") outwardGatePass.purpose = payload.purpose.trim();
    if (typeof payload.type === "string") outwardGatePass.type = payload.type.trim();
    if (typeof payload.vehicleNumber === "string") outwardGatePass.vehicleNumber = payload.vehicleNumber.trim();
    if (typeof payload.nameTo === "string") outwardGatePass.nameTo = payload.nameTo.trim();
    if (typeof payload.issuedBy === "string") outwardGatePass.issuedBy = payload.issuedBy.trim();
    if (typeof payload.date !== "undefined") outwardGatePass.date = new Date(payload.date) ;
    if (typeof payload.mobileNumber === "string") outwardGatePass.mobileNumber = payload.mobileNumber;
    if (typeof payload.containerNumber === "string" || payload.containerNumber === undefined) {
        outwardGatePass.containerNumber = payload.containerNumber;
    }
    if (typeof payload.items !== "undefined") outwardGatePass.items = payload.items as IOutwardGatePassItems[];

    await outwardGatePass.save();

    return res
        .status(200)
        .json(new ApiResponse(200, outwardGatePass, "Gate Pass In updated successfully"));
});

export const deleteOutwardGatePass = asyncHandler(async (
    req: Request<{ id: string }>,
    res: Response
) => {
    const { id } = req.params;

    const deletedOutwardGatePass = await OutwardGatePass.findByIdAndDelete(id);

    if (!deletedOutwardGatePass) {
        throw new ApiError(404, "Gate Pass In not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedOutwardGatePass, "Gate Pass In deleted successfully"));
});

export const getOutwardGatePass = asyncHandler(async (
    req: Request<{ id: string }>,
    res: Response
) => {
    const { id } = req.params;

    const outwardGatePass = await OutwardGatePass.findById(id);

    if (!outwardGatePass) {
        throw new ApiError(404, "Gate Pass In not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, outwardGatePass, "Gate Pass In fetched successfully"));
});

export const getAllOutwardGatePasses = asyncHandler(async (_req: Request, res: Response) => {
    const outwardGatePasses = await OutwardGatePass.find().sort({ OGPNumber : -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, outwardGatePasses, "Gate Pass Ins fetched successfully"));
});
