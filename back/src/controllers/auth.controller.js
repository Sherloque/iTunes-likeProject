import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default_secret";

export const signup = async (req, res) => {
  const existing = await User.findOne({ login: req.body.login });
  if (existing) return res.status(400).json({ err: "Login already exists" });

  const newUser = new User(req.body);
  await newUser.save();
  const { password, ...userInfo } = newUser.toObject();
  const token = jwt.sign({ sub: userInfo }, secret);
  res.status(201).json({ token, userInfo });
};

export const login = async (req, res) => {
  const user = await User.findOne({
    login: req.body.login,
    password: req.body.password,
  });
  if (!user) return res.status(404).json({ err: "Invalid credentials" });

  const { password, ...userInfo } = user.toObject();
  const token = jwt.sign({ sub: userInfo }, secret);
  res.status(200).json({ token, userInfo });
};

export const updateProfile = async (req, res) => {
  const update = { ...req.body };
  delete update.id;
  const user = await User.findByIdAndUpdate(req.body.id, update, { new: true });
  const { password, ...userInfo } = user.toObject();
  const token = jwt.sign({ sub: userInfo }, secret);
  res.status(200).json({ token, userInfo });
};
