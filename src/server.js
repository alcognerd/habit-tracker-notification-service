import express from "express";
import dotenv from "dotenv";
import handler from "./api/cron.js";
import nodeCron from "node-cron";
import { ping } from "./api/ping.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Helper function to register repeated cron schedules
function registerCron(time, label, job) {
  nodeCron.schedule(
    time,
    async () => {
      console.log(`Running cron → ${label}`);
      await job();
    },
    { timezone: process.env.TIMEZONE }
  );
}

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);

  registerCron("*/10 * * * *", "Ping", ping);

  registerCron(process.env.CRON_TIME_1, "CRON_TIME_1", handler);
  registerCron(process.env.CRON_TIME_2, "CRON_TIME_2", handler);
  registerCron(process.env.CRON_TIME_3, "CRON_TIME_3", handler);
});
