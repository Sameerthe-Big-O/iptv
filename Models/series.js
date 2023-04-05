import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    genre_id: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
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
    trailer: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Series", seriesSchema);
