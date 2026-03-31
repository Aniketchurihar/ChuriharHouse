const BOT_PATTERNS = /bot|crawler|spider|vercel|headless|lighthouse|pingdom|uptimerobot|curl|wget|python|node-fetch|go-http/i;

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
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const location = `${city}${region ? ", " + region : ""}, ${country}`;

  const isAniket = visitor === "Aniket";
  const isPrivateView = !visitor || visitor === "Unknown";
  const shouldEmail = isAniket || isPrivateView;

  console.log(JSON.stringify({
    event: isAniket ? "ANIKET_VIEWED" : isPrivateView ? "PRIVATE_VIEW" : "CHURIHAR_VIEWED",
    visitor: visitor || "Unknown",
    timestamp,
    ip,
    location,
    browser: browser || "Unknown",
    screenSize: screenSize || "Unknown",
    language: language || "Unknown",
    timezone: timezone || "Unknown",
    referrer: referrer || "Direct",
  }));

  if (!shouldEmail) {
    return res.status(200).json({ success: true });
  }

  const subject = isAniket
    ? `🏠 Aniket just viewed Churihar Home`
    : `👁️ Private Viewing — Unknown visitor`;

  const headerBg = isAniket ? "#0a0a0a" : "#7f1d1d";
  const headerTitle = isAniket ? "🏠 Aniket Visited" : "👁️ Private Viewing Alert";

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #fafaf9; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5;">
      <div style="background: ${headerBg}; padding: 24px 28px;">
        <h2 style="margin: 0; color: #fafaf9; font-size: 20px;">${headerTitle}</h2>
      </div>
      <div style="padding: 24px 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; width: 120px;">Visitor</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${isAniket ? "Aniket" : "Unknown"}</td>
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
