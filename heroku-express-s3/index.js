import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import express from "express";

const app = express();
app.set("port", process.env.PORT || 8000);

const REGION = "ap-northeast-1";
const s3Client = new S3Client({ region: REGION });

app.get("/", function (req, res) {
  res.send("Express on Heroku!!!!");
});

app.get("/buckets", async (req, res) => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("Success", data.Buckets);
    res.send(JSON.stringify(data.Buckets));
  } catch (err) {
    console.log("Error", err);
  }
});

app.listen(app.get("port"), () => {
  console.log(`Express を ${app.get("port")} ポートで起動します`);
});
