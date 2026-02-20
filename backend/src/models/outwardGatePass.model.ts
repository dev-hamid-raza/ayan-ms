import mongoose, { Schema } from "mongoose";
import { Counter } from "./counter.model.js";
import { IOutwardGatePass, IOutwardGatePassItems } from "../types/outwardGatePass.types.js";

const outwardGatePassItemsSchema = new Schema<IOutwardGatePassItems>({
    description: {
        type: String,
        required: true
    },
    pack: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    netWeight: {
        type: Number,
    },
    remarks: {
        type: String
    },
},
    { _id: false }
);

const outwardGatePassSchema = new Schema<IOutwardGatePass>(
    {
        OGPNumber: { 
            type: Number, 
            required: true },
        vehicleNumber: { 
            type: String, 
            required: true },
        nameTo: { 
            type: String, 
            required: true },
        items: { 
            type: [outwardGatePassItemsSchema], 
            required: true },
        issuedBy: { 
            type: String, 
            required: true 
        },
        date: { 
            type: Date, 
            required: true 
        },
        mobileNumber: { 
            type: String, 
            required: true 
        },
        purpose: { 
            type: String, 
            required: true 
        },
        type: { 
            type: String, 
            required: true 
        },
        containerNumber: { type: String },
        isDeleted : {
            type: Boolean,
            required: true,
            default: false
        },
        updatedBy: String,
        deletedBy: String,
    },
    { timestamps: true }
);

outwardGatePassSchema.pre('validate', async function (next) {
    if (!this.isNew || this.OGPNumber) return 

    try {
        const counter = await Counter.findOneAndUpdate(
            { modelName: 'outwardGatePass' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )

        this.OGPNumber = counter.seq
    } catch (error) {
        throw error
    }
})

export const OutwardGatePass = mongoose.model<IOutwardGatePass>("outwardGatePass", outwardGatePassSchema);