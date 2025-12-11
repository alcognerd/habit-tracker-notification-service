import { getAccessToken } from "./getAccessToken.js";

export async function sendNotification(deviceToken, title, body) {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(
      `https://fcm.googleapis.com/v1/projects/algo-projects-15fff/messages:send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token: deviceToken,
            notification: {
              title,
              body,
            },
          },
        }),
      }
    );

    const data = await res.json();
    console.log("Notification response:", data);
    return data;
  } catch (err) {
    console.error("Error sending notification:", err);
    throw err;
  }
}
