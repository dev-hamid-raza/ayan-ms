import { Document } from "mongoose";

export interface IOutwardGatePassItems {
    description: string;
    pack: number;
    unit: string;
    quantity: number;
    netWeight: number;
    remarks?: string;
}

export interface IOutwardGatePass extends Document {
    OGPNumber: number;
    purpose: string;
    type: string;
    vehicleNumber: string;
    nameTo: string;
    items: IOutwardGatePassItems[];
    issuedBy: string;
    receivedBy: string;
    date: Date;
    mobileNumber: string;
    containerNumber?: string;
}

export interface IOutwardGatePassRequestBody {
    gatePassInNumber: number;
    purpose: string;
    type: string;
    vehicleNumber: string;
    nameTo: string;
    items: IOutwardGatePassItems[];
    issuedBy: string;
    receivedBy: string;
    date: Date;
    mobileNumber: string;
    containerNumber?: string;
}