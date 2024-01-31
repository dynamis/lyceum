import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
const router = express.Router();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

router.get("/hello", (req, res) => {
  res.send(
    res.send("Hello Express!")
  );
});

router.all("/json", (req, res) => {
  res.json({ data: "some data as JSON" });
});

app.use("/api", router);

app.listen(port);
