import { Document } from "mongoose";

export interface IGatePassInItems {
    description: string;
    pack: number;
    unit: string;
    quantity: number;
    netWeight: number;
    remarks?: string;
}

export interface IGatePassIn extends Document {
    gatePassInNumber: number;
    purpose: string;
    type: string;
    vehicleNumber: string;
    nameTo: string;
    items: IGatePassInItems[];
    issuedBy: string;
    receivedBy: string;
    date: Date;
    mobileNumber: string;
    containerNumber?: string;
}

export interface IGatePassInRequestBody {
    gatePassInNumber: number;
    purpose: string;
    type: string;
    vehicleNumber: string;
    nameTo: string;
    items: IGatePassInItems[];
    issuedBy: string;
    receivedBy: string;
    date: Date;
    mobileNumber: string;
    containerNumber?: string;
}