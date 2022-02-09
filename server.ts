import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));
app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/shorten_url", (_, res) => {
  // check origin 
  // check 
  res.send("Hello from server");
});


app.listen(PORT, () => {
  console.log(`Server running on http:\\localhost${PORT}`);
});
