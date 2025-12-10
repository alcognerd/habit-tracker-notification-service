import express from "express";
import dotenv from "dotenv";
import handler from "./api/cron.js";
import nodeCron from "node-cron";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.listen(3000, () => {
  console.log(`App running.. at port ${PORT}`);
  nodeCron.schedule("*/1 * * * *", () => {
    console.log("Running cron job...");
    handler();
  });
});
