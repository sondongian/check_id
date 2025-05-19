const admins = [
  { username: "admin", password: "son123" },
  { username: "mod", password: "123456" }
];
 
module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    return res.setHeader("Content-Type", "text/html").end(`
      <html><head><title>Login</title></head><body>
      <form method="POST">
        <input name="username" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button>Login</button>
      </form>
      </body></html>
    `);
  }

  const body = await new Promise(resolve => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(new URLSearchParams(data)));
  });

  const username = body.get("username");
  const password = body.get("password");

  const ok = admins.some(admin => admin.username === username && admin.password === password);

  if (ok) {
    res.setHeader("Set-Cookie", `admin=${username}; Path=/; HttpOnly`);
    return res.writeHead(302, { Location: "/admin" }).end();
  }

  return res.end("Đăng nhập sai. <a href='/login'>Thử lại</a>");
};
