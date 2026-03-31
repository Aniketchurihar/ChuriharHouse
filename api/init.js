import { redis, pipeline } from "./_redis.js";

const BOT_PATTERNS = /bot|crawler|spider|vercel|headless|lighthouse|pingdom|uptimerobot|curl|wget|python|node-fetch|go-http/i;

function parseDevice(ua) {
  if (!ua) return { device: "Unknown", os: "Unknown", browserName: "Unknown" };

  let device = "Desktop";
  if (/Mobile|Android.*Mobile|iPhone|iPod/i.test(ua)) device = "Mobile";
  else if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) device = "Tablet";

  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = /iPhone|iPad|iPod/i.test(ua) ? "iOS" : "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Linux/i.test(ua)) os = "Linux";
  else if (/CrOS/i.test(ua)) os = "ChromeOS";

  let browserName = "Unknown";
  if (/Edg\//i.test(ua)) browserName = "Edge";
  else if (/OPR|Opera/i.test(ua)) browserName = "Opera";
  else if (/Chrome|CriOS/i.test(ua)) browserName = "Chrome";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browserName = "Safari";
  else if (/Firefox|FxiOS/i.test(ua)) browserName = "Firefox";

  return { device, os, browserName };
}

async function storeVisit(visitData) {
  const { ip } = visitData;
  const ipKey = `visits:ip:${ip}`;

  const results = await pipeline([
    ["LPUSH", "visits:log", JSON.stringify(visitData)],
    ["INCR", ipKey],
    ["INCR", "visits:total"],
  ]);

  if (!results) return 0;
  return results[1]?.result || 0;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { visitor, browser, screenSize, language, timezone, referrer } = req.body || {};

  if (BOT_PATTERNS.test(browser || "")) {
    return res.status(200).json({ success: true });
  }

  const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "Unknown";
  const city = req.headers["x-vercel-ip-city"] || "Unknown";
  const country = req.headers["x-vercel-ip-country"] || "Unknown";
  const region = req.headers["x-vercel-ip-country-region"] || "";
  const latitude = req.headers["x-vercel-ip-latitude"] || "";
  const longitude = req.headers["x-vercel-ip-longitude"] || "";
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const location = `${city}${region ? ", " + region : ""}, ${country}`;
  const { device, os, browserName } = parseDevice(browser);

  const isAniket = visitor === "Aniket";
  const isPrivateView = !visitor || visitor === "Unknown";
  const shouldEmail = isAniket || isPrivateView;

  const visitData = {
    visitor: visitor || "Unknown",
    timestamp,
    ip,
    location,
    city,
    country,
    region,
    latitude,
    longitude,
    device,
    os,
    browserName,
    browser: browser || "Unknown",
    screenSize: screenSize || "Unknown",
    language: language || "Unknown",
    timezone: timezone || "Unknown",
    referrer: referrer || "Direct",
    type: isAniket ? "ANIKET" : isPrivateView ? "PRIVATE" : "CHURIHAR",
  };

  const visitCount = await storeVisit(visitData);

  console.log(JSON.stringify({ event: visitData.type + "_VIEWED", ...visitData, visitCount }));

  if (!shouldEmail) {
    return res.status(200).json({ success: true });
  }

  const subject = isAniket
    ? `🏠 Aniket just viewed Churihar Home`
    : `👁️ Private Viewing — Unknown visitor`;

  const headerBg = isAniket ? "#0a0a0a" : "#7f1d1d";
  const headerTitle = isAniket ? "🏠 Aniket Visited" : "👁️ Private Viewing Alert";
  const visitBadge = visitCount > 1
    ? `<span style="background: #f59e0b; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-left: 10px;">Visit #${visitCount}</span>`
    : `<span style="background: #22c55e; color: #fff; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; margin-left: 10px;">First visit</span>`;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #fafaf9; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5;">
      <div style="background: ${headerBg}; padding: 24px 28px;">
        <h2 style="margin: 0; color: #fafaf9; font-size: 20px;">${headerTitle} ${visitBadge}</h2>
      </div>
      <div style="padding: 24px 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; width: 120px;">Visitor</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${isAniket ? "Aniket" : "Unknown"}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Visits from IP</td>
            <td style="padding: 10px 0; font-weight: 600; color: ${visitCount > 1 ? "#f59e0b" : "#22c55e"};">${visitCount} ${visitCount === 1 ? "(first time)" : "times"}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Time (IST)</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${timestamp}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Location</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${location}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">IP Address</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${ip}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Browser</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${browser || "Unknown"}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Screen</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${screenSize || "Unknown"}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Language</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${language || "Unknown"}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Timezone</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${timezone || "Unknown"}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Referrer</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${referrer || "Direct"}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 16px 28px; background: #f5f5f4; text-align: center; font-size: 12px; color: #9ca3af;">
        Churihar Home Visitor Tracking
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Churihar Home <onboarding@resend.dev>",
        to: "aniket.ch71@gmail.com",
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend error:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Track error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
