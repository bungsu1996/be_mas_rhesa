import { Schema, model, Model } from 'mongoose';
import JadwalInterface from "./../interface/jadwal.interface";

const jadwalSchema = new Schema(
  {
    tanggal: { type: Date, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: "User"}],
  },
  {
    versionKey: false,
  }
);

const JadwalModel: Model<JadwalInterface> = model<JadwalInterface>("Jadwal", jadwalSchema);
export default JadwalModel;