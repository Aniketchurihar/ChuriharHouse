import { redis } from "./_redis.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { gpsLatitude, gpsLongitude } = req.body || {};
  if (!gpsLatitude || !gpsLongitude) {
    return res.status(400).json({ error: "Missing coordinates" });
  }

  const ip =
    req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "Unknown";

  await redis(
    "SET",
    `gps:${ip}`,
    JSON.stringify({
      latitude: gpsLatitude,
      longitude: gpsLongitude,
      timestamp: new Date().toISOString(),
    }),
  );

  return res.status(200).json({ success: true });
}
