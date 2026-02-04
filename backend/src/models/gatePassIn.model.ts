import mongoose, { Schema } from "mongoose";
import { IGatePassIn, IGatePassInItems } from "../types/gatePassIn.types";
import { Counter } from "./counter.model";

const gatePassInItemsSchema = new Schema<IGatePassInItems>({
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

const gatePassInSchema = new Schema<IGatePassIn>(
    {
        gatePassInNumber: { 
            type: Number, 
            required: true },
        vehicleNumber: { 
            type: String, 
            required: true },
        nameTo: { 
            type: String, 
            required: true },
        items: { 
            type: [gatePassInItemsSchema], 
            required: true },
        issuedBy: { 
            type: String, 
            required: true 
        },
        receivedBy: { 
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
        containerNumber: { type: String },
    },
    { timestamps: true }
);

gatePassInSchema.pre('validate', async function (next) {
    if (!this.isNew || this.gatePassInNumber) return 

    try {
        const counter = await Counter.findOneAndUpdate(
            { modelName: 'GatePassIn' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )

        this.gatePassInNumber = counter.seq
    } catch (error) {
        throw error
    }
})

export const GatePassIn = mongoose.model<IGatePassIn>("GatePassIn", gatePassInSchema);