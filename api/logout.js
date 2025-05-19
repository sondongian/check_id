module.exports = async function handler(req, res) {
  res.setHeader("Set-Cookie", "admin=; Path=/; Max-Age=0");
  res.writeHead(302, { Location: "/login" });
  res.end();
}; 
