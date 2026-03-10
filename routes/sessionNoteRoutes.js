import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  listNotesForCampaign,
  createNoteForCampaign,
  updateNote,
  deleteNote,
} from "../controllers/sessionNoteController.js";

const router = Router();

// Nested under campaigns
router.get("/campaigns/:id/notes", requireAuth, listNotesForCampaign);
router.post("/campaigns/:id/notes", requireAuth, createNoteForCampaign);

// Direct note routes
router.put("/notes/:noteId", requireAuth, updateNote);
router.delete("/notes/:noteId", requireAuth, deleteNote);

export default router;