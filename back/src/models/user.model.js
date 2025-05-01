import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  login: String,
  password: String,
  firstname: String,
  lastname: String
});

export const User = mongoose.model('User', userSchema);