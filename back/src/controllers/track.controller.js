import { Track } from "../models/track.model.js";
import { Playlist } from "../models/playlist.model.js";
import { getPart } from "../utils/file.utils.js";
import { sha256File } from "../utils/hash.utils.js";

export const uploadTrack = async (req, res) => {
  const owner = req.body.field;
  const type = "uploads";

  const fileHash = "id" + sha256File(req.file.path);
  const existing = await Track.findOne({ id: fileHash });
  if (existing) {
    return res.status(400).json({ err: "Track already uploaded" });
  }

  const newTrack = new Track({
    id: fileHash,
    artist: getPart(req.file.originalname, 0),
    title: getPart(req.file.originalname, 1),
    preview: `/uploads/${req.file.filename}`,
  });

  await newTrack.save();

  await Playlist.findOneAndUpdate(
    { owner, type },
    { $push: { songs: newTrack._id } },
    { upsert: true }
  );

  res.status(201).json(newTrack);
};

export const getUploadedTracks = async (req, res) => {
  const playlist = await Playlist.findOne({
    owner: req.body.owner,
    type: "uploads",
  }).populate("songs");
  if (!playlist) return res.status(404).json({ err: "NO PLAYLIST" });
  res.json(playlist.songs);
};

export const getRecentUploads = async (req, res) => {
  let sorted = await Track.find({ id: /id/ }).sort({ _id: 1 });
  if (sorted) res.send(sorted);
  else {
    res.status(404).json({
      err: "NO SONGS UPLOADED",
    });
  }
};

export const search = async (req, res) => {
  try {
    const searchValue = req.query.value;
    if (!searchValue) {
      return res.status(400).json({ err: "Search value is required" });
    }

    const searchResults = await Track.find({
      $or: [
        { artist: new RegExp(searchValue, "i") },
        { title: new RegExp(searchValue, "i") },
      ],
    });

    if (searchResults.length > 0) {
      res.json(searchResults);
    } else {
      res.status(404).json({
        err: "No songs match your search criteria",
      });
    }
  } catch (error) {
    res.status(500).json({
      err: "An error occurred while searching",
    });
  }
};
