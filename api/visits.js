import { redis } from "./_redis.js";

const ADMIN_REF = "x7k9m2";

function renderDashboard(visits, total, ipCounts) {
  const dataJson = JSON.stringify(visits).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
  const ipCountsJson = JSON.stringify(ipCounts).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Churihar Home — Visitor Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #0a0a0a; color: #e5e5e5; padding: 24px; }
    h1 { font-size: 24px; font-weight: 600; margin-bottom: 4px; color: #fafafa; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 12px; }
    .refresh-btn { background: #262626; border: 1px solid #404040; color: #a3a3a3; padding: 6px 14px; border-radius: 8px; cursor: pointer; font-size: 12px; }
    .refresh-btn:hover { background: #333; color: #e5e5e5; }
    .subtitle { color: #737373; font-size: 14px; margin-bottom: 24px; }
    .stats { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
    .stat-card { background: #171717; border: 1px solid #262626; border-radius: 12px; padding: 16px 20px; min-width: 130px; flex: 1; }
    .stat-card.active { border-color: #525252; background: #1a1a1a; }
    .stat-card:hover { border-color: #404040; cursor: pointer; }
    .stat-value { font-size: 28px; font-weight: 700; color: #fafafa; }
    .stat-label { font-size: 11px; color: #737373; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }

    .filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; align-items: center; }
    .filter-group { display: flex; flex-direction: column; gap: 4px; }
    .filter-label { font-size: 10px; color: #525252; text-transform: uppercase; letter-spacing: 0.5px; }
    select, .filters input { background: #171717; border: 1px solid #262626; border-radius: 8px; padding: 7px 12px; color: #e5e5e5; font-size: 12px; outline: none; min-width: 120px; }
    select:focus, .filters input:focus { border-color: #525252; }
    .filters input { min-width: 200px; }
    .filters input::placeholder { color: #404040; }
    .clear-btn { background: none; border: 1px solid #404040; color: #737373; padding: 7px 12px; border-radius: 8px; cursor: pointer; font-size: 12px; align-self: flex-end; }
    .clear-btn:hover { color: #e5e5e5; border-color: #737373; }
    .result-count { font-size: 12px; color: #525252; align-self: flex-end; padding-bottom: 2px; }

    .section-title { font-size: 16px; font-weight: 600; margin: 28px 0 12px; color: #fafafa; }
    .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid #262626; margin-bottom: 28px; }
    .table-scroll { max-height: 520px; overflow-y: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: #171717; padding: 10px 14px; text-align: left; font-weight: 600; color: #a3a3a3; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; position: sticky; top: 0; z-index: 1; }
    td { padding: 8px 14px; border-top: 1px solid #1a1a1a; vertical-align: top; }
    tr:hover td { background: #171717; }
    .mono { font-family: 'Cascadia Code', 'Fira Code', monospace; font-size: 11px; }
    .badge { padding: 2px 8px; border-radius: 6px; font-size: 10px; font-weight: 600; text-transform: uppercase; white-space: nowrap; }
    .badge-red { background: #7f1d1d; color: #fca5a5; }
    .badge-blue { background: #1e3a5f; color: #93c5fd; }
    .badge-green { background: #14532d; color: #86efac; }
    .badge-gray { background: #262626; color: #a3a3a3; }
    .map-link { color: #60a5fa; text-decoration: none; font-size: 10px; margin-left: 4px; }
    .map-link:hover { text-decoration: underline; }
    .empty { text-align: center; padding: 48px; color: #525252; }
    .tag { display: inline-block; padding: 1px 6px; border-radius: 4px; font-size: 10px; background: #262626; color: #a3a3a3; margin-right: 3px; }
    @media (max-width: 768px) {
      body { padding: 12px; }
      .stats { flex-direction: column; }
      .filters { flex-direction: column; }
      select, .filters input { width: 100%; min-width: unset; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Churihar Home — Visitors</h1>
    <button class="refresh-btn" onclick="location.reload()">Refresh</button>
  </div>
  <p class="subtitle">Total: <strong>${total}</strong> visits recorded</p>

  <div class="stats" id="stat-cards">
    <div class="stat-card active" data-filter="ALL" onclick="filterByType('ALL')">
      <div class="stat-value" id="stat-all">${total}</div>
      <div class="stat-label">All Visits</div>
    </div>
    <div class="stat-card" data-filter="CHURIHAR" onclick="filterByType('CHURIHAR')">
      <div class="stat-value" id="stat-churihar">0</div>
      <div class="stat-label">Churihar (ref)</div>
    </div>
    <div class="stat-card" data-filter="ANIKET" onclick="filterByType('ANIKET')">
      <div class="stat-value" id="stat-aniket">0</div>
      <div class="stat-label">Aniket (ref)</div>
    </div>
    <div class="stat-card" data-filter="PRIVATE" onclick="filterByType('PRIVATE')">
      <div class="stat-value" id="stat-private">0</div>
      <div class="stat-label">No Ref / Private</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" id="stat-ips">0</div>
      <div class="stat-label">Unique IPs</div>
    </div>
  </div>

  <div class="filters">
    <div class="filter-group">
      <span class="filter-label">Visitor Type</span>
      <select id="f-type" onchange="applyFilters()">
        <option value="">All Types</option>
        <option value="CHURIHAR">Churihar (ref)</option>
        <option value="ANIKET">Aniket (ref)</option>
        <option value="PRIVATE">No Ref / Private</option>
      </select>
    </div>
    <div class="filter-group">
      <span class="filter-label">Device</span>
      <select id="f-device" onchange="applyFilters()"></select>
    </div>
    <div class="filter-group">
      <span class="filter-label">OS</span>
      <select id="f-os" onchange="applyFilters()"></select>
    </div>
    <div class="filter-group">
      <span class="filter-label">Browser</span>
      <select id="f-browser" onchange="applyFilters()"></select>
    </div>
    <div class="filter-group">
      <span class="filter-label">City</span>
      <select id="f-city" onchange="applyFilters()"></select>
    </div>
    <div class="filter-group">
      <span class="filter-label">Country</span>
      <select id="f-country" onchange="applyFilters()"></select>
    </div>
    <div class="filter-group">
      <span class="filter-label">PIN / ZIP Code</span>
      <select id="f-postal" onchange="applyFilters()"></select>
    </div>
    <div class="filter-group">
      <span class="filter-label">IP Address</span>
      <select id="f-ip" onchange="applyFilters()"></select>
    </div>
    <div class="filter-group">
      <span class="filter-label">Search</span>
      <input type="text" id="f-search" placeholder="Free text search..." oninput="applyFilters()">
    </div>
    <button class="clear-btn" onclick="clearFilters()">Clear All</button>
    <span class="result-count" id="result-count"></span>
  </div>

  <h2 class="section-title">Visits by IP</h2>
  <div class="table-wrap">
    <div class="table-scroll" style="max-height: 300px;">
      <table>
        <thead>
          <tr><th>IP Address</th><th>Visits</th><th>Location</th><th>PIN/ZIP</th><th>Device</th><th>Last Visitor</th><th>Last Visit</th></tr>
        </thead>
        <tbody id="ip-body"></tbody>
      </table>
    </div>
  </div>

  <h2 class="section-title">All Visits</h2>
  <div class="table-wrap">
    <div class="table-scroll">
      <table>
        <thead>
          <tr><th>Time (IST)</th><th>Type</th><th>Visitor</th><th>IP</th><th>IP Visits</th><th>Location</th><th>PIN/ZIP</th><th>Device</th><th>OS</th><th>Browser</th><th>Screen</th><th>Referrer</th></tr>
        </thead>
        <tbody id="visits-body"></tbody>
      </table>
    </div>
  </div>

  <script>
    const ALL_VISITS = ${dataJson};
    const IP_COUNTS = ${ipCountsJson};
    let activeTypeFilter = 'ALL';

    function esc(s) {
      const d = document.createElement('div');
      d.textContent = s || '';
      return d.innerHTML;
    }

    function badgeClass(type) {
      if (type === 'PRIVATE') return 'badge-red';
      if (type === 'ANIKET') return 'badge-blue';
      if (type === 'CHURIHAR') return 'badge-green';
      return 'badge-gray';
    }

    function mapLink(v) {
      if (!v.latitude || !v.longitude) return '';
      return ' <a href="https://www.google.com/maps?q=' + v.latitude + ',' + v.longitude + '" target="_blank" class="map-link">Map</a>';
    }

    function populateSelect(id, values) {
      const sel = document.getElementById(id);
      const current = sel.value;
      const sorted = [...values].sort();
      sel.innerHTML = '<option value="">All</option>' + sorted.map(v => '<option value="' + esc(v) + '">' + esc(v) + '</option>').join('');
      if (current && sorted.includes(current)) sel.value = current;
    }

    function unique(arr, key) {
      return [...new Set(arr.map(v => v[key] || 'Unknown').filter(Boolean))];
    }

    function initDropdowns() {
      populateSelect('f-device', unique(ALL_VISITS, 'device'));
      populateSelect('f-os', unique(ALL_VISITS, 'os'));
      populateSelect('f-browser', unique(ALL_VISITS, 'browserName'));
      populateSelect('f-city', unique(ALL_VISITS, 'city'));
      populateSelect('f-country', unique(ALL_VISITS, 'country'));
      populateSelect('f-postal', unique(ALL_VISITS, 'postalCode'));
      populateSelect('f-ip', unique(ALL_VISITS, 'ip'));
    }

    function getFiltered() {
      const type = document.getElementById('f-type').value;
      const device = document.getElementById('f-device').value;
      const os = document.getElementById('f-os').value;
      const browser = document.getElementById('f-browser').value;
      const city = document.getElementById('f-city').value;
      const country = document.getElementById('f-country').value;
      const postal = document.getElementById('f-postal').value;
      const ip = document.getElementById('f-ip').value;
      const search = document.getElementById('f-search').value.toLowerCase();

      return ALL_VISITS.filter(v => {
        if (type && v.type !== type) return false;
        if (device && (v.device || 'Unknown') !== device) return false;
        if (os && (v.os || 'Unknown') !== os) return false;
        if (browser && (v.browserName || 'Unknown') !== browser) return false;
        if (city && (v.city || 'Unknown') !== city) return false;
        if (country && (v.country || 'Unknown') !== country) return false;
        if (postal && (v.postalCode || 'Unknown') !== postal) return false;
        if (ip && v.ip !== ip) return false;
        if (search) {
          const text = JSON.stringify(v).toLowerCase();
          if (!text.includes(search)) return false;
        }
        return true;
      });
    }

    function renderVisits(filtered) {
      const tbody = document.getElementById('visits-body');
      if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="12" class="empty">No visits match filters</td></tr>';
        return;
      }
      tbody.innerHTML = filtered.map(v =>
        '<tr>' +
        '<td>' + esc(v.timestamp) + '</td>' +
        '<td><span class="badge ' + badgeClass(v.type) + '">' + esc(v.type) + '</span></td>' +
        '<td>' + esc(v.visitor) + '</td>' +
        '<td class="mono">' + esc(v.ip) + '</td>' +
        '<td><strong>' + (IP_COUNTS[v.ip] || '?') + '</strong></td>' +
        '<td>' + esc(v.location) + mapLink(v) + '</td>' +
        '<td>' + esc(v.postalCode || '-') + '</td>' +
        '<td><span class="tag">' + esc(v.device || '?') + '</span></td>' +
        '<td><span class="tag">' + esc(v.os || '?') + '</span></td>' +
        '<td><span class="tag">' + esc(v.browserName || '?') + '</span></td>' +
        '<td>' + esc(v.screenSize) + '</td>' +
        '<td>' + esc(v.referrer) + '</td>' +
        '</tr>'
      ).join('');
    }

    function renderIpTable(filtered) {
      const ips = {};
      filtered.forEach(v => {
        if (!ips[v.ip]) ips[v.ip] = { count: 0, latest: v };
        ips[v.ip].count++;
      });

      const tbody = document.getElementById('ip-body');
      const sorted = Object.entries(ips).sort((a, b) => b[1].count - a[1].count);

      if (!sorted.length) {
        tbody.innerHTML = '<tr><td colspan="7" class="empty">No data</td></tr>';
        return;
      }

      tbody.innerHTML = sorted.map(([ip, d]) =>
        '<tr>' +
        '<td class="mono">' + esc(ip) + '</td>' +
        '<td><strong>' + (IP_COUNTS[ip] || d.count) + '</strong></td>' +
        '<td>' + esc(d.latest.location) + mapLink(d.latest) + '</td>' +
        '<td>' + esc(d.latest.postalCode || '-') + '</td>' +
        '<td><span class="tag">' + esc(d.latest.device || '?') + '</span> <span class="tag">' + esc(d.latest.os || '?') + '</span> <span class="tag">' + esc(d.latest.browserName || '?') + '</span></td>' +
        '<td>' + esc(d.latest.visitor) + '</td>' +
        '<td>' + esc(d.latest.timestamp) + '</td>' +
        '</tr>'
      ).join('');
    }

    function updateStats(filtered) {
      document.getElementById('stat-all').textContent = filtered.length;
      document.getElementById('stat-churihar').textContent = filtered.filter(v => v.type === 'CHURIHAR').length;
      document.getElementById('stat-aniket').textContent = filtered.filter(v => v.type === 'ANIKET').length;
      document.getElementById('stat-private').textContent = filtered.filter(v => v.type === 'PRIVATE').length;
      document.getElementById('stat-ips').textContent = new Set(filtered.map(v => v.ip)).size;
    }

    function applyFilters() {
      const filtered = getFiltered();
      renderVisits(filtered);
      renderIpTable(filtered);
      updateStats(filtered);
      document.getElementById('result-count').textContent = filtered.length + ' of ' + ALL_VISITS.length + ' visits';
    }

    function filterByType(type) {
      activeTypeFilter = type;
      const sel = document.getElementById('f-type');
      sel.value = type === 'ALL' ? '' : type;
      document.querySelectorAll('.stat-card[data-filter]').forEach(c => {
        c.classList.toggle('active', c.dataset.filter === type);
      });
      applyFilters();
    }

    function clearFilters() {
      document.getElementById('f-type').value = '';
      document.getElementById('f-device').value = '';
      document.getElementById('f-os').value = '';
      document.getElementById('f-browser').value = '';
      document.getElementById('f-city').value = '';
      document.getElementById('f-country').value = '';
      document.getElementById('f-postal').value = '';
      document.getElementById('f-ip').value = '';
      document.getElementById('f-search').value = '';
      activeTypeFilter = 'ALL';
      document.querySelectorAll('.stat-card[data-filter]').forEach(c => {
        c.classList.toggle('active', c.dataset.filter === 'ALL');
      });
      applyFilters();
    }

    initDropdowns();
    applyFilters();
  </script>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { key } = req.query;
  if (key !== ADMIN_REF) {
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
