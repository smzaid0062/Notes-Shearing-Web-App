import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note"
  }
}, { timestamps: true });

export default mongoose.model("Like", likeSchema);
