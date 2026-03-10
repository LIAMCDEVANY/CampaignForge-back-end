import Campaign from "../models/Campaign.js";

export async function listCampaigns(req, res) {
  const campaigns = await Campaign.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  return res.json(campaigns);
}

export async function createCampaign(req, res) {
  const { title, system, description } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const campaign = await Campaign.create({
    title,
    system,
    description,
    user: req.user._id,
  });

  return res.status(201).json(campaign);
}

export async function getCampaign(req, res) {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!campaign) return res.status(404).json({ message: "Campaign not found" });
  return res.json(campaign);
}

export async function updateCampaign(req, res) {
  const { title, system, description } = req.body;

  const updated = await Campaign.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { title, system, description },
    { new: true, runValidators: true }
  );

  if (!updated) return res.status(404).json({ message: "Campaign not found" });
  return res.json(updated);
}

export async function deleteCampaign(req, res) {
  const deleted = await Campaign.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deleted) return res.status(404).json({ message: "Campaign not found" });
  return res.json({ message: "Campaign deleted" });
}