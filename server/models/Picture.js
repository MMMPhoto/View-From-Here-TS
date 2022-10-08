import { Schema, model, Types } from "mongoose";
// import userSchema from "./User";

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
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
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

export default Picture;
