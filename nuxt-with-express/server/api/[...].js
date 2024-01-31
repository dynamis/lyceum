import bodyParser from "body-parser";
import express from "express";

const app = express();
const router = express.Router();

app.use(bodyParser.json());

router.get("/hello", (req, res) => {
  res.send("Hello Express from catch-all route server Handler of Nuxt");
});

router.all("/json", (req, res) => {
  res.json({ data: "some data as JSON" });
});

app.use("/api", router);

// convert node middleware to h3 handlar
// ref: https://github.com/nuxt/framework/releases/tag/v3.0.0-rc.12
const h3handler = fromNodeMiddleware(app);
export default h3handler;
