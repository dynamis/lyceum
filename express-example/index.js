import cors from "cors";
import express from "express";
import { users } from "./data.js";
const front = express();
const frontPort = 8000;
const backend = express();
const backendPort = 8080;

// front: クライアント Web アプリホスティングサーバ
// backend: バックエンド API サーバ (別オリジン)

// 静的ファイルホスティング
front.use(express.static("public"));

front.listen(frontPort, function () {
  console.log(
    `クライアント Web アプリサーバを ${frontPort} 番ポートで起動します`
  );
});

// バックエンドサーバのの全リクエストで CORS を許可する場合
// backend.use(cors());

// application/json リクエストボディの受け取り
backend.use(express.json()); // application/json

backend.get("/", function (req, res) {
  res.send("バックエンド API サーバ");
});

// github api wrapper
// 第二引数に cors() を入れたことでこの API は個別に CORS 許可となる
backend.get("/github/:slug", cors(), async (req, res) => {
  const { slug } = req.params;
  res.send("github api call");
});

// 単一アイテムの特定プロパティ取得API
backend.get("/:endpoint/:slug/github", cors(), (req, res) => {
  const { endpoint, slug } = req.params;
  if (endpoint === "users") {
    let target = users.filter((item) => item.id === slug);
    if (target.length >= 1) {
      res.send(JSON.stringify(target[0].github));
    } else {
      res.send(`user not found: ${slug}`);
    }
  } else {
    res.send(`invalid endpoint: ${endpoint}`);
  }
});

// 単一アイテムの詳細API
backend.get("/:endpoint/:slug", (req, res) => {
  const { endpoint, slug } = req.params;
  if (endpoint === "users") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // ここは本来なら DB アクセスとかをするところ
    let target = users.filter((item) => item.id === slug);
    if (target.length >= 1) {
      res.send(target);
    } else {
      res.send(`user not found: ${slug}`);
    }
  } else {
    res.send(`invalid endpoint: ${endpoint}`);
  }
});

// 複数アイテムの一覧API
backend.get("/:endpoint", async (req, res) => {
  const { endpoint, slug } = req.params;
  if (endpoint === "users") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(users);
  } else {
    res.send(`invalid endpoint: ${endpoint}`);
  }
});

// POST での動作 (本来 POST データ処理するが割愛)
backend.post("/:endpoint", async (req, res) => {
  const { endpoint, slug } = req.params;
  if (endpoint === "users") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(users);
  } else {
    res.send(`invalid endpoint: ${endpoint}`);
  }
});

// OPTIONS での動作 (CORS 対応例)
backend.options("/:endpoint", async (req, res) => {
  const { endpoint, slug } = req.params;
  if (endpoint === "users") {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    //res.header("Access-Control-Allow-Methods", "GET,POST");
    res.send("");
  } else {
    res.send(`invalid endpoint: ${endpoint}`);
  }
});

// microCMS backend 一覧 API
backend.get("/:endpoint", async (req, res) => {
  const { endpoint } = req.params;
  // ...
  res.send("not implemented yet");
});

backend.listen(backendPort, function () {
  console.log(`バックエンド API サーバを ${backendPort} 番ポートで起動します`);
});
