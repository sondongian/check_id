const { getData } = require('../lib/kv');

module.exports = async function handler(req, res) {
  const isAdmin = (req.headers.cookie || "").includes("admin=");
  if (!isAdmin) return res.writeHead(302, { Location: "/login" }).end();

  const data = await getData();

  const html = `
  <html>
  <head>
    <title>Admin</title>
    <style>
      body { font-family: Arial; background: #f5f5f5; padding: 20px; }
      textarea { width: 100%; height: 100px; }
    </style>
  </head>
  <body>
    <h2>🔐 Quản lý ID</h2>
    <form method="POST" action="/update">
      <textarea name="ids" placeholder="Nhập ID cách nhau dấu phẩy..."></textarea><br><br>
      <button name="type" value="whitelist">✅ Thêm whitelist</button>
      <button name="type" value="blacklist">🚫 Thêm blacklist</button>
    </form>

    <h3>✅ WHITELIST (${data.whitelist.length})</h3>
    <ul>${data.whitelist.map(id => `<li>${id}</li>`).join("")}</ul>

    <h3>🚫 BLACKLIST (${data.blacklist.length})</h3>
    <ul>${data.blacklist.map(id => `<li>${id}</li>`).join("")}</ul>

    <br><a href="/logout">Đăng xuất</a>
  </body>
  </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.end(html);
};
