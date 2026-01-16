import admin from "firebase-admin";
import fs from "node:fs";

let initialized = false;

function getServiceAccount() {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (json && json.trim().length > 0) {
    return JSON.parse(json);
  }

  if (path && path.trim().length > 0) {
    const raw = fs.readFileSync(path, "utf8");
    return JSON.parse(raw);
  }

  return null;
}

export function getFirebaseAdmin() {
  if (!initialized) {
    const serviceAccount = getServiceAccount();
    if (!serviceAccount) {
      throw new Error(
        "Missing Firebase Admin service account. Provide FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON"
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    initialized = true;
  }

  return admin;
}
