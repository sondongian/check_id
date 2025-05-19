const { addToList } = require('../lib/kv');

module.exports = async function handler(req, res) {
  const isAdmin = (req.headers.cookie || "").includes("admin=");
  if (!isAdmin) return res.writeHead(302, { Location: "/login" }).end();

  const body = await new Promise(resolve => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(new URLSearchParams(data)));
  });

  const ids = body.get("ids")?.split(",").map(id => id.trim()).filter(Boolean) || [];
  const type = body.get("type");

  if (["whitelist", "blacklist"].includes(type) && ids.length) {
    await addToList(type, ids);
  }

  res.writeHead(302, { Location: "/admin" }).end();
};
