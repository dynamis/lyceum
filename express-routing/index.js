import express from "express";
const app = express();
const port = 8000;

// application/json リクエストボディの受け取り
app.use(express.json()); // application/json
// application/x-www-form-urlencoded リクエストボディの受け取り
app.use(express.urlencoded({ extended: true }));

// 静的ファイルのホスティング
// 先に指定したディレクトリから順次探索、見つかった時点でそれを利用する
app.use(express.static("public"));
app.use(express.static("files"));

// ルート定義
app.get("/", function (req, res) {
  res.send("ルートへのアクセス!");
});

app.get("/about", function (req, res) {
  res.send("/about ページです！");
});

app.post("/", function (req, res) {
  res.send("ルートに POST リクエスト受け取りました！");
});

app.put("/user", function (req, res) {
  res.send("/user に PUT リクエスト受け取りました");
});

// パターン指定によるルート定義

// ? の前の文字はあってもなくてもよい。abcd, acd にマッチ
app.get("/ab?cd", function (req, res) {
  res.send("ab?cd - abcd or acd");
});
// + の前の文字は繰り返し可能。abcd, abbcd, abbbcd .... にマッチ
app.get("/ab+cd", function (req, res) {
  res.send("ab+cd - abcd, abbcd, abbbcd...");
});

// * には任意の文字列が入る。abcd, abxcd, ab123cd, abExpresscd ... にマッチ
app.get("/ab*cd", function (req, res) {
  res.send("ab*cd - abcd, abxcd, ab123cd, abExpresscd...");
});
// ()でまとめて指定することも可能。abcde, abe にマッチ
app.get("/ab(cd)?e", function (req, res) {
  res.send("ab(cd)?e - abode, abe");
});

// 正規表現によるルート指定
app.get(/xyz/, function (req, res) {
  res.send("/xyz/");
});

app.get(/.*panda$/, function (req, res) {
  res.send("/.*panda$/");
});

app.get(/^\/fire/, function (req, res) {
  res.send("/^\\/fire/");
});

app.get(/^\/images\/fire/, function (req, res) {
  res.send("/^\\/images\\/fire/");
});

app.get(/^\/apiv1\/user\//, function (req, res) {
  res.send("/^\\/apiv1\\/user\\//");
});

// リクエストの受け取り
app.post("/profile", function (req, res, next) {
  console.log(req.body);
  res.json(req.body);
});

// サーバを起動
app.listen(port, function () {
  console.log(`サンプルアプリを ${port} 番ポートで起動します`);
});
