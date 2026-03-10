import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
import sessionNoteRoutes from "./routes/sessionNoteRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "CampaignForge API running" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/", sessionNoteRoutes); // includes /campaigns/:id/notes and /notes/:noteId

// Start server after DB connection
const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err.message);
    process.exit(1);
  });