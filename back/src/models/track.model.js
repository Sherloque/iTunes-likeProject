import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  id: String,
  artist: String,
  title: String,
  preview: String,
  duration: String,
});

export const Track = mongoose.model("Track", trackSchema);
