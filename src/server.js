import express from "express";
import dotenv from "dotenv";
import { ping } from "./api/ping.js";
import handler from "./api/cron.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/api/ping", async (req, res) => {
  try {
   await ping(); // assume ping() returns data directly
  
    res.json({ message: "Ping complete" });
  } catch (error) {
    res.status(500).json({ message: "Ping failed", error: error.message });
  }
});

app.get("/api/notification", async (req, res) => {
  try {
    await handler(); // FIX: don't shadow `res`
    console.log(result);
    res.json({ message: "cron completed", result });
  } catch (e) {
    res.status(500).json({ message: "cron failed", error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
