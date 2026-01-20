import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  fileUrl: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  aiResult: {
    match: Boolean,
    confidence: Number,
    reason: String
  }
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
