export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { visitor, browser, screenSize, language, timezone, referrer } = req.body || {};

  const ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "Unknown";
  const city = req.headers["x-vercel-ip-city"] || "Unknown";
  const country = req.headers["x-vercel-ip-country"] || "Unknown";
  const region = req.headers["x-vercel-ip-country-region"] || "";
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const isKnownVisitor = visitor && visitor !== "Unknown";
  const subject = isKnownVisitor
    ? `🏠 ${visitor} just viewed Churihar Home`
    : `⚠️ Unknown visitor tried to access Churihar Home`;

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #fafaf9; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e5;">
      <div style="background: ${isKnownVisitor ? "#0a0a0a" : "#7f1d1d"}; padding: 24px 28px;">
        <h2 style="margin: 0; color: #fafaf9; font-size: 20px;">
          ${isKnownVisitor ? "🏠 Visitor Alert" : "⚠️ Unauthorized Access Attempt"}
        </h2>
      </div>
      <div style="padding: 24px 28px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; width: 120px;">Visitor</td>
            <td style="padding: 10px 0; font-weight: 600; color: #1a1a1a;">${visitor || "Unknown"}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Time (IST)</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${timestamp}</td>
          </tr>
          <tr style="border-top: 1px solid #f0f0f0;">
            <td style="padding: 10px 0; color: #6b7280;">Location</td>
            <td style="padding: 10px 0; color: #1a1a1a;">${city}${region ? ", " + region : ""}, ${country}</td>
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
