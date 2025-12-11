import { GoogleAuth } from "google-auth-library";
import fs from "fs";
import path from "path";

export async function getAccessToken() {
  try {
    const serviceAccountPath = path.resolve("./src/keys/service-account.json");
    const serviceAccount = JSON.parse(
      fs.readFileSync(serviceAccountPath, "utf-8")
    );

    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
    });

    const client = await auth.getClient();
    const tokenResponse = await client.getAccessToken();
    return tokenResponse.token;
  } catch (err) {
    console.error("Error getting access token:", err);
    throw err;
  }
}
