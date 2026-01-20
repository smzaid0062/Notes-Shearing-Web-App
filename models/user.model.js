import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student"
  },
  course: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
