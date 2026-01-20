import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note"
  },
  value: {
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true });

export default mongoose.model("Rating", ratingSchema);
