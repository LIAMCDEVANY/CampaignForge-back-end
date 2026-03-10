import mongoose from "mongoose";

const sessionNoteSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    content: { type: String, required: true, trim: true },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SessionNote", sessionNoteSchema);