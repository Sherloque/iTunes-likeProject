import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Track" }],
  type: String,
});

export const Playlist = mongoose.model("Playlist", playlistSchema);
