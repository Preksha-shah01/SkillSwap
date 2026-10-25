
const {
  initializeApp,
  getApps,
  cert,
} = require("firebase-admin/app");

const { getAuth } = require("firebase-admin/auth");
const fs = require("node:fs");

// Read the service-account JSON from a private location
const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  throw new Error(
    "FIREBASE_SERVICE_ACCOUNT_PATH is missing from server/.env"
  );
}

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    "Firebase service-account JSON file was not found"
  );
}

if (getApps().length === 0) {
  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );

  initializeApp({
    credential: cert(serviceAccount),
  });
}

module.exports = { auth: getAuth() };
