// S3 操作に使用するコマンドを AWS JS SDK からインポート
import { ListBucketsCommand } from "@aws-sdk/client-s3";
// HTTP サーバ
import http from "http";
// S3 操作用のヘルパークライアントオブジェクト
import { s3Client } from "./libs/s3Client.js";

async function listBuckets() {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("バケットリスト: ", data.Buckets);
    return data.Buckets;
  } catch (err) {
    console.log("エラー: ", err);
    return "error!";
  }
}

http
  .createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(await listBuckets()));
  })
  .listen(8080);
