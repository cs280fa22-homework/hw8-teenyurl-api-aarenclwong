import mongoose from "mongoose";
import { z } from "zod";

const TeenyUrlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    minlength: 6,
    maxlength: 10,
    required: true,
    unique: true,
  },
});

TeenyUrlSchema.path("url").validate((url) => {
  try {
    z.string().url().parse(url);
    return true;
  } catch (err) {
    return false;
  }
}, "Invalid URL");

const TeenyUrl = mongoose.model("TeenyUrl", TeenyUrlSchema);

export default TeenyUrl;
