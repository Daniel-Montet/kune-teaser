import express from "express";
import path from "path";
import helmet from "helmet";
import { PORT } from "./lib/constants";
import bodyParser from "body-parser";
import { validateUrl } from "./lib/validateUrl";

const app = express();

// middleware
app.use(helmet);
app.use(express.static(path.join(__dirname, "build")));

// routes
app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/shorten_url", bodyParser.json(), async (req, res) => {
  // validate req.body.url
  let { value, error } = await validateUrl(req.body.url);
  if (error) {
    return res.send("Invalid domain").status(400);
  }

  // shorten the Url

  res.send("Hello from server").status(200);
});


app.listen(PORT, () => {
  console.log(`Server running on http:\\localhost${PORT}`);
});
