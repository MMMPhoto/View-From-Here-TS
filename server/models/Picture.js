import { Schema, model, Types } from "mongoose";
import userSchema from "./User";

const picSchema = new Schema(
  {
    picId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Picture = model("Picture", picSchema);

module.exports = Picture;
