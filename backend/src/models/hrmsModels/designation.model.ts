import mongoose, {Model, Schema} from "mongoose";

import { IDesignation } from "../../types/hrmsTypes/designation.types";

const designationSchema = new Schema<IDesignation>({
    designationName: {
        type: String,
        unique: true
    }
})

export const Designation: Model<IDesignation> = mongoose.model<IDesignation>('Designation', designationSchema)