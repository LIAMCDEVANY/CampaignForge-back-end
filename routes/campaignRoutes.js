import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  listCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaignController.js";

const router = Router();

router.use(requireAuth);

router.get("/", listCampaigns);
router.post("/", createCampaign);
router.get("/:id", getCampaign);
router.put("/:id", updateCampaign);
router.delete("/:id", deleteCampaign);

export default router;