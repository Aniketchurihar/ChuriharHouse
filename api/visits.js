import { redis } from "./_redis.js";

const ADMIN_KEY = process.env.ADMIN_DASHBOARD_KEY || "ch_admin_9v3k";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDashboard(visits, total, ipCounts) {
  const uniqueIps = Object.keys(ipCounts).length;

  const rows = visits
    .map(
      (v) => `
      <tr>
        <td>${escapeHtml(v.timestamp)}</td>
        <td><span class="badge ${v.type === "PRIVATE" ? "badge-red" : v.type === "ANIKET" ? "badge-blue" : "badge-green"}">${escapeHtml(v.type)}</span></td>
        <td>${escapeHtml(v.visitor)}</td>
        <td class="mono">${escapeHtml(v.ip)}</td>
        <td><strong>${ipCounts[v.ip] || "?"}</strong></td>
        <td>${escapeHtml(v.location)}</td>
        <td class="small">${escapeHtml(v.browser).substring(0, 80)}</td>
        <td>${escapeHtml(v.screenSize)}</td>
        <td>${escapeHtml(v.referrer)}</td>
      </tr>`
    )
    .join("");

  const ipTableRows = Object.entries(ipCounts)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([ip, count]) => `
      <tr>
        <td class="mono">${escapeHtml(ip)}</td>
        <td><strong>${count}</strong></td>
        <td>
          ${visits
            .filter((v) => v.ip === ip)
            .slice(0, 1)
            .map((v) => escapeHtml(v.location))
            .join("")}
        </td>
        <td>${escapeHtml(visits.find((v) => v.ip === ip)?.visitor || "Unknown")}</td>
        <td>${escapeHtml(visits.find((v) => v.ip === ip)?.timestamp || "")}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Churihar Home — Visitor Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 24px; }
    h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; color: #fafafa; }
    .subtitle { color: #737373; font-size: 14px; margin-bottom: 32px; }
    .stats { display: flex; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
    .stat-card { background: #171717; border: 1px solid #262626; border-radius: 12px; padding: 20px 24px; min-width: 160px; }
    .stat-value { font-size: 32px; font-weight: 700; color: #fafafa; }
    .stat-label { font-size: 12px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
    .section-title { font-size: 18px; font-weight: 600; margin: 32px 0 16px; color: #fafafa; }
    .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #262626; margin-bottom: 32px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th { background: #171717; padding: 12px 16px; text-align: left; font-weight: 600; color: #a3a3a3; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; position: sticky; top: 0; }
    td { padding: 10px 16px; border-top: 1px solid #1a1a1a; vertical-align: top; }
    tr:hover td { background: #171717; }
    .mono { font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: 12px; }
    .small { font-size: 11px; color: #a3a3a3; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .badge { padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
    .badge-red { background: #7f1d1d; color: #fca5a5; }
    .badge-blue { background: #1e3a5f; color: #93c5fd; }
    .badge-green { background: #14532d; color: #86efac; }
    .filter-bar { margin-bottom: 16px; display: flex; gap: 12px; align-items: center; }
    .filter-bar input { background: #171717; border: 1px solid #262626; border-radius: 8px; padding: 8px 14px; color: #e5e5e5; font-size: 13px; width: 260px; outline: none; }
    .filter-bar input:focus { border-color: #525252; }
    .filter-bar input::placeholder { color: #525252; }
    .empty { text-align: center; padding: 48px; color: #525252; }
    @media (max-width: 768px) { body { padding: 12px; } .stats { flex-direction: column; } }
  </style>
</head>
<body>
  <h1>Churihar Home — Visitors</h1>
  <p class="subtitle">All recorded visits. Protected admin view.</p>

  <div class="stats">
    <div class="stat-card">
      <div class="stat-value">${total}</div>
      <div class="stat-label">Total Visits</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${uniqueIps}</div>
      <div class="stat-label">Unique IPs</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${visits.filter((v) => v.type === "PRIVATE").length}</div>
      <div class="stat-label">Private Views</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${visits.filter((v) => v.type === "CHURIHAR").length}</div>
      <div class="stat-label">Churihar Views</div>
    </div>
  </div>

  <h2 class="section-title">Visits by IP</h2>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>IP Address</th><th>Visit Count</th><th>Location</th><th>Last Visitor</th><th>Last Visit</th></tr>
      </thead>
      <tbody>${ipTableRows || '<tr><td colspan="5" class="empty">No data yet</td></tr>'}</tbody>
    </table>
  </div>

  <h2 class="section-title">All Visits</h2>
  <div class="filter-bar">
    <input type="text" id="search" placeholder="Filter by IP, location, visitor..." oninput="filterTable()">
  </div>
  <div class="table-wrap" style="max-height: 600px; overflow-y: auto;">
    <table>
      <thead>
        <tr><th>Time (IST)</th><th>Type</th><th>Visitor</th><th>IP</th><th>IP Visits</th><th>Location</th><th>Browser</th><th>Screen</th><th>Referrer</th></tr>
      </thead>
      <tbody id="visits-body">${rows || '<tr><td colspan="9" class="empty">No visits recorded yet</td></tr>'}</tbody>
    </table>
  </div>

  <script>
    function filterTable() {
      const q = document.getElementById('search').value.toLowerCase();
      const rows = document.querySelectorAll('#visits-body tr');
      rows.forEach(r => {
        r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    }
  </script>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { key } = req.query;
  if (key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const rawVisits = await redis("LRANGE", "visits:log", 0, 499);
    const total = (await redis("GET", "visits:total")) || 0;

    if (!rawVisits || rawVisits.length === 0) {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      return res.status(200).send(renderDashboard([], 0, {}));
    }

    const visits = rawVisits.map((v) => {
      try { return JSON.parse(v); } catch { return null; }
    }).filter(Boolean);

    const uniqueIps = [...new Set(visits.map((v) => v.ip))];
    const ipCountResults = await Promise.all(
      uniqueIps.map((ip) => redis("GET", `visits:ip:${ip}`))
    );

    const ipCounts = {};
    uniqueIps.forEach((ip, i) => {
      ipCounts[ip] = parseInt(ipCountResults[i], 10) || 0;
    });

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(renderDashboard(visits, parseInt(total, 10) || visits.length, ipCounts));
  } catch (err) {
    console.error("Visits dashboard error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
