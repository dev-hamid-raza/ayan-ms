import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { IGatePassInRequestBody, IGatePassInItems } from "../types/gatePassIn.types";
import { ApiError } from "../utils/ApiError";
import { GatePassIn } from "../models/gatePassIn.model";
import { Counter } from "../models/counter.model";
import { ApiResponse } from "../utils/ApiResponse";

// Function to validate the items array
const validateGatePassInItems = (items: IGatePassInItems[]) => {
    if (!items || items.length === 0) {
        throw new ApiError(400, "Items array cannot be empty");
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

// Function to validate the gate pass in object
const validateGatePassIn = (data: IGatePassInRequestBody) => {
    // Required fields validation
    if (!data.purpose || typeof data.purpose !== "string") {
        throw new ApiError(400, "Purpose is required and must be a string");
    }
    if (!data.type || (data.type !== "IN" && data.type !== "OUT")) {
        throw new ApiError(400, "Type must be either 'IN' or 'OUT'");
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
    if (!data.receivedBy || typeof data.receivedBy !== "string") {
        throw new ApiError(400, "ReceivedBy is required and must be a string");
    }
    if (!data.date || !(data.date instanceof Date)) {
        throw new ApiError(400, "Date is required and must be a valid date");
    }
    if (!data.mobileNumber || !/^[0-9]{10}$/.test(data.mobileNumber)) {
        throw new ApiError(400, "Mobile number is required and must be a valid 10-digit number");
    }

    // Validate the items array
    validateGatePassInItems(data.items);

    // Optional fields validation
    if (data.containerNumber && typeof data.containerNumber !== "string") {
        throw new ApiError(400, "Container number must be a string if provided");
    }
};

export const createGatePassIn = asyncHandler(async (req: Request<{}, {}, IGatePassInRequestBody>, res: Response) => {
    const gatePassInData = req.body;

        validateGatePassIn(gatePassInData);
    

    const gatePassIn = new GatePassIn(gatePassInData);

        await gatePassIn.save();
        return res
        .status(201)
        .json(
            new ApiResponse(201, gatePassIn, "Gate Pass In created successfully")
        );
});
