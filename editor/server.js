const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const fs = require("fs");
const COMMANDS_FILE = "data/gta3.json";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.post("/commands", (req, res) => {
  try {
    const lastUpdate = Date.now();
    const newContent = {
      meta: {
        last_update: lastUpdate,
      },
      commands: req.body,
    };
    fs.writeFileSync(COMMANDS_FILE, JSON.stringify(newContent, null, 2));
    res.send({ result: "success", last_update: lastUpdate });
  } catch {
    res.status(500);
  }
});

app.get("/commands", (req, res) => {
  const content = fs.readFileSync(COMMANDS_FILE, { encoding: "utf-8" });

  res.json(JSON.parse(content));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
