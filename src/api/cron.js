import { sendNotification } from "../lib/send-notifications.js";

export default async function handler() {
  try {
    const backendRes = await fetch(
      `${process.env.SPRING_API_URL}/api/notification-data`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.CRON_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    const users = await backendRes.json();
    for (const user of users) {
      const { status, token } = user;
      console.log(status);
      console.log(token);
      const completed = status.COMPLETED || 0;
      const skipped = status.SKIPPED || 0;
      const pending = status.PENDING || 0;

      const title = "Today's Habit Summary";
      const body = `Completed: ${completed}, Skipped: ${skipped},pending:${pending}`;
      for (const t of token) {
        await sendNotification(t, title, body);
      }
    }
  } catch (err) {
    console.error("Cron Error:", err);
  }
}
