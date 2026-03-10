import Campaign from "../models/Campaign.js";
import SessionNote from "../models/SessionNote.js";

export async function listNotesForCampaign(req, res) {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!campaign) return res.status(404).json({ message: "Campaign not found" });

  const notes = await SessionNote.find({
    campaign: campaign._id,
    user: req.user._id,
  }).sort({ date: -1 });

  return res.json(notes);
}

export async function createNoteForCampaign(req, res) {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!campaign) return res.status(404).json({ message: "Campaign not found" });

  const { date, content } = req.body;
  if (!date || !content) {
    return res.status(400).json({ message: "Date and content are required" });
  }

  const note = await SessionNote.create({
    date,
    content,
    campaign: campaign._id,
    user: req.user._id,
  });

  return res.status(201).json(note);
}

export async function updateNote(req, res) {
  const { date, content } = req.body;

  const updated = await SessionNote.findOneAndUpdate(
    { _id: req.params.noteId, user: req.user._id },
    { date, content },
    { new: true, runValidators: true }
  );

  if (!updated) return res.status(404).json({ message: "Note not found" });
  return res.json(updated);
}

export async function deleteNote(req, res) {
  const deleted = await SessionNote.findOneAndDelete({
    _id: req.params.noteId,
    user: req.user._id,
  });

  if (!deleted) return res.status(404).json({ message: "Note not found" });
  return res.json({ message: "Note deleted" });
}