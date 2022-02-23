// S3 操作に使用するコマンドを AWS JS SDK からインポート
import { ListBucketsCommand } from "@aws-sdk/client-s3";
// S3 操作用のヘルパークライアントオブジェクト
import { s3Client } from "./libs/s3Client.js";

const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("バケットリスト: ", data.Buckets);
  } catch (err) {
    console.log("エラー: ", err);
  }
};
run();