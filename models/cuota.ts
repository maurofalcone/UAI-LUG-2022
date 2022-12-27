import { Schema, model } from "mongoose";

export interface ICuota {}

const cuotaSchema = new Schema({});

export const CuotaModel = model("Cuota", cuotaSchema);
