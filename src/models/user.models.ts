import { Schema, model, Model } from 'mongoose';
import UserInterface from "./../interface/user.interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String },
    role: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel: Model<UserInterface> = model<UserInterface>("User", userSchema);
export default UserModel;