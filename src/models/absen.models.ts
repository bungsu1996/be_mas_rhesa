import { Schema, model, Model } from 'mongoose';
import AbsenInterface from "./../interface/absen.interface";

const absenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User"},
    absen: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AbsenModel: Model<AbsenInterface> = model<AbsenInterface>("Absen", absenSchema);
export default AbsenModel;