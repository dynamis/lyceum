import express from "express";
const app = express();
const port = 8000;

// application/json リクエストボディの受け取り
app.use(express.json()); // application/json

app.get("/", function (req, res) {
  res.send("Express!");
});

app.get("/json", function (req, res) {
  res.json({ key: "value", json: "データ" });
});

app.get("/redirect", function (req, res) {
  res.redirect(301, "/redirected");
});

app.get("/redirected", function (req, res) {
  res.send("redirected!");
});

app.get("/404", (req, res) => {
  res.status(404).send("そんなページないよ！");
});

app.get("/500", (req, res) => {
  res.status(500).send({ error: "何かがおかしいのです..." });
});

app.get("/header", (req, res) => {
  res.setHeader("X-red", "panda");
  res.send("X-red ヘッダ付きです！");
});

app.get("/nopower", (req, res) => {
  // デフォルト付与されるヘッダを削除する
  res.removeHeader("X-Powered-By");
  res.send("X-Powered-By ヘッダ消しました");
});

app.get("/cleaning", (req, res) => {
  var filename = "cleaning.jpg";
  var options = {
    root: ".",
    dotfiles: "deny",
  };
  res.sendFile(filename, options, (err) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Sent: ", filename);
    }
  });
});

app.get("/query", (req, res) => {
  console.log(req.query);
  res.send(`クエリ: ${JSON.stringify(req.query)}`);
});

function handler1(req, res, next) {
  console.log("ハンドラー1 (応答返さない)");
  // req.startTime = Date.now();
  req.startTime = new Date();
  next();
}
function handler2(req, res, next) {
  console.log("ハンドラー2 (まだ応答返さない)");
  next();
}
app.get(
  "/starttime",
  [handler1, handler2],
  (req, res, next) => {
    console.log("クライアントへの応答は次のハンドラーで返します ...");
    next();
  },
  (req, res) => {
    res.send(`${req.startTime} に API アクセスされました!`);
  }
);

app.get(
  "/api/path",
  [handler1, handler2],
  function (req, res, next) {
    console.log("クライアントへの応答は次のハンドラーで返します ...");
    next();
  },
  function (req, res) {
    res.send("API の応答です!");
  }
);

// curl http://localhost:8000/profile -X POST
//   -H "Content-Type: application/json" -d '{"name":"名前", "age":20}'
//
app.post("/profile", function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`サンプルアプリを起動します`);
});
