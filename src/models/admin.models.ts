import { Schema, model, Model } from 'mongoose';
import AdminInterface from "./../interface/admin.interface";

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const AdminModel: Model<AdminInterface> = model<AdminInterface>("Admin", adminSchema);
export default AdminModel;