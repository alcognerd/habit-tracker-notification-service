import fetch from "node-fetch";

export async function ping() {
  try {
    const backendRes = await fetch(`${process.env.SPRING_API_URL}/api/ping`, {
      method: "GET",
      headers: {
        "x-api-key": process.env.CRON_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!backendRes.ok) {
      const errorBody = await backendRes.text();
      console.error("Backend Error:", backendRes.status, errorBody);
      return null;
    }

    const data = await backendRes.json();
    console.log(data);
  } catch (error) {
    console.error("Network Error:", error.message);
  }
}
