import { Document } from "mongoose";

export interface IEmployeeType extends Document {
    empType: string
}