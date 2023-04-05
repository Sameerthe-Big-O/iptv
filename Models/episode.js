import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const episodeSchema = new mongoose.Schema(
  {
    season_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Season",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Episode", episodeSchema);
