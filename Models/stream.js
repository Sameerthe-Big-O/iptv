import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const streamSchema = new mongoose.Schema(
  {
    episode_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Episode',
      required: true,
    },
    user_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stream", streamSchema);
