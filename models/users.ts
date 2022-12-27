import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
