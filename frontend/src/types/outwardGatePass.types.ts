import { ApiResponse } from "./api.types";

export interface IOutwardGatePassItems {
    description: string;
    pack: number;
    unit: string;
    quantity: number;
    netWeight?: number;
    remarks?: string;
}

export interface IOutwardGatePass {
    _id: string;
    OGPNumber: number;
    purpose: string;
    type: string;
    vehicleNumber: string;
    nameTo: string;
    items: IOutwardGatePassItems[];
    issuedBy: string;
    date: Date;
    mobileNumber: string;
    containerNumber?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted: boolean
}
export interface IOutwardGatePassCreate {
    purpose: string;
    type: string;
    vehicleNumber: string;
    nameTo: string;
    items: IOutwardGatePassItems[];
    issuedBy: string;
    date: Date;
    mobileNumber: string;
    containerNumber?: string;
}

export type IOutwardGatePassResponse = ApiResponse<IOutwardGatePass[]>

export type IOutwardGatePassCreatedResponse = ApiResponse<IOutwardGatePass>