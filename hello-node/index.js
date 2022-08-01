import http from "http";
const port = 8080

// HTTP サーバオブジェクトを作成:
http
  .createServer(function (req, res) {
    // クライアントに返す HTTP レスポンスボディを順次書く
    res.write("Running Node ");
    res.write(process.version); // Node.js バージョン
    res.end(" (end of response)"); // レスポンス完了
  })
  .listen(port); // 指定ポートを Listen して HTTP サーバを起動
