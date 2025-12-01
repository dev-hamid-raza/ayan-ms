import { Document } from "mongoose";

export type JwtExpiry =
  | `${number}s` // seconds
  | `${number}m` // minutes
  | `${number}h` // hours
  | `${number}d` // days
  | `${number}w`; // weeks (optional)

export interface ICounter extends Document {
  modelName: string;
  seq: number;
}