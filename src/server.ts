import express from "express";
import path from "path";
import helmet from "helmet";
import { PORT } from "./lib/constants";
import bodyParser from "body-parser";
import { generateShortUrl, validateUrl } from "./lib/validateUrl";

const app = express();

// middleware
app.use(helmet());
app.use(express.static(path.join(__dirname, "build")));

// routes
app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/shorten_url", bodyParser.json(), async (req, res) => {
  // validate req.body.url
  console.log(req.body.url)
  let { value, error } = await validateUrl(req.body.url);
  console.log("third checkpoint", error);
  if (error) {
    return res.json({ error: "Invalid url", url: null }).status(400);
  }

  // shorten the Url e.g google.com ==> kune.ly/<customurl>
  const kuneUrl = await generateShortUrl(value!);
  return res.json({ url: kuneUrl, error: null }).status(200);
});


app.listen(PORT, () => {
  console.log(`Server running on http:\\localhost:${PORT}`);
});