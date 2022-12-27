import { Schema, model, Types, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  comments: Types.ObjectId[];
  author: Types.ObjectId;
}

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    productDetails: [
      {
        qty: Number,
        productName: String,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<IBlog>("Blog", blogSchema);
