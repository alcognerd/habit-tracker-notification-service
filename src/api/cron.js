import { sendNotification } from "../lib/send-notifications.js";

export default async function handler() {
  try {
    const backendRes = await fetch(process.env.SPRING_API_URL, {
      method: "GET",
      headers: {
        "x-api-key": process.env.CRON_API_KEY,
        "Content-Type": "application/json",
      },
    });
    const users = await backendRes.json();
    for (const user of users) {
      const { status, token } = user;
      const completed = status.COMPLETED || 0;
      const skipped = status.SKIPPED || 0;

      const title = "Today's Habit Summary";
      const body = `Completed: ${completed}, Skipped: ${skipped}`;
      for (const t of token) {
        await sendNotification(t, title, body);
      }
    }
  } catch (err) {
    console.error("Cron Error:", err);
  }
}
