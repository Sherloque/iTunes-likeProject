import { Playlist } from "../models/playlist.model.js";
import { Track } from "../models/track.model.js";

export const addToFavourites = async (req, res) => {
  console.log(req.headers.authorization);
  const { id, artist, title, preview, duration, owner } = req.body;
  const type = "favourites";

  let track = await Track.findOne({ id });
  if (!track) {
    track = new Track({ id, artist, title, preview, duration });
    await track.save();
  }

  const playlist = await Playlist.findOne({ owner, type });
  if (playlist && playlist.songs.includes(track._id)) {
    return res.status(400).json({ err: "Track already in playlist" });
  }

  await Playlist.findOneAndUpdate(
    { owner, type },
    { $addToSet: { songs: track._id } },
    { upsert: true }
  );

  res.status(200).json({ success: true });
};

export const getFavourites = async (req, res) => {
  const playlist = await Playlist.findOne({
    owner: req.body.owner,
    type: "favourites",
  }).populate("songs");
  if (!playlist) return res.status(404).json({ err: "NO PLAYLIST" });
  res.json(playlist.songs);
};
