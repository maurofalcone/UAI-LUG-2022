import { Schema, model, Types, Document } from "mongoose";

export interface IComment extends Document {
  author: Types.ObjectId;
  content: string;
}

const commentsSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
  },
  { timestamps: true }
);

export default model<IComment>("Comment", commentsSchema);
