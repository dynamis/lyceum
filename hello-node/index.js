import http from "http";

// HTTP サーバオブジェクトを作成:
http
  .createServer(function (req, res) {
    // クライアントに返す HTTP レスポンスボディを順次書く
    res.write("Running Node ");
    res.write(process.version);
    res.end("test"); // レスポンス完了
  })
  .listen(8080); // 指定ポートを Listen してサーバを起動
