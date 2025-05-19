const { getData } = require('../lib/kv');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { gameId } = req.body || {};
  if (!gameId) return res.status(400).json({ allowed: false, reason: "Thiếu ID" });

  const data = await getData();

  if (data.blacklist.includes(gameId)) {
    return res.status(403).json({ allowed: false, reason: "ID bị khoá" });
  }

  if (!data.whitelist.includes(gameId)) {
    return res.status(401).json({ allowed: false, reason: "ID chưa được cấp phép" });
  }

  res.json({ allowed: true });
};
