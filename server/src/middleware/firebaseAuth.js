import { getFirebaseAdmin } from "../config/firebaseAdmin.js";
import { User } from "../models/User.js";

function getBearerToken(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS || "";
  return raw
    .split(",")
    .map((e) => normalizeEmail(e))
    .filter(Boolean);
}

export async function firebaseAuth(req, res, next) {
  try {
    const token = getBearerToken(req);
    if (!token) {
      req.auth = null;
      return next();
    }

    const admin = getFirebaseAdmin();
    const decoded = await admin.auth().verifyIdToken(token);

    const uid = decoded.uid;
    if (!uid) {
      throw new Error("Missing uid in token");
    }

    const email = normalizeEmail(decoded.email);
    const name = decoded.name || decoded.displayName || "";

    const adminEmails = getAdminEmails();
    const isAdminEmail = email && adminEmails.includes(email);

    let userDoc = await User.findOne({ uid });
    if (!userDoc) {
      try {
        userDoc = await User.create({
          uid,
          email: email || "",
          name,
          role: isAdminEmail ? "admin" : "user"
        });
      } catch (createErr) {
        // Handle duplicate key error - try to find by uid again
        if (createErr.code === 11000) {
          userDoc = await User.findOne({ uid });
          if (!userDoc) {
            throw createErr;
          }
        } else {
          throw createErr;
        }
      }
    } else {
      const shouldBeAdmin = isAdminEmail || userDoc.role === "admin";
      userDoc.email = email || userDoc.email;
      userDoc.name = name || userDoc.name;
      userDoc.role = shouldBeAdmin ? "admin" : "user";
      await userDoc.save();
    }

    req.auth = {
      uid,
      email,
      name,
      role: userDoc.role,
      userId: String(userDoc._id),
      userDoc
    };

    return next();
  } catch (err) {
    // Log error for debugging
    console.error("Firebase Auth Error:", err.message || err.code || "Unknown error");
    if (err.code) {
      console.error("Error code:", err.code);
    }
    req.auth = null;
    return next();
  }
}
