const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const pickBy = require("lodash/pickBy");

const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.post("/commands/:game", (req, res) => {
  try {
    const lastUpdate = Date.now();
    const newContent = {
      meta: {
        last_update: lastUpdate,
      },
      extensions: stripBody(req.body),
    };
    const file = getCommandsFile(req.params.game);
    fs.writeFileSync(file, JSON.stringify(newContent, null, 2));
    res.send({ result: "success", last_update: lastUpdate });
  } catch {
    res.status(500);
  }
});

app.get("/commands/:game", (req, res) => {
  const file = getCommandsFile(req.params.game);
  const content = fs.readFileSync(file, { encoding: "utf-8" });

  res.json(JSON.parse(content));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function getCommandsFile(game) {
  switch (game) {
    case "gta3":
      return "data/gta3.json";
    case "vc":
      return "data/vc.json";
  }
  throw new Error(`unknown game: ${game}`);
}

function stripBody(body) {
  return body.map((e) => ({
    ...e,
    commands: e.commands.map((c) =>
      pickBy(
        {
          ...c,
          id: c.id,
          attrs: pickBy(c.attrs, (x) => x),
          class: c.attrs.is_unsupported ? null : c.class,
          member: c.attrs.is_unsupported ? null : c.member,
          short_desc: c.attrs.is_unsupported ? null : c.short_desc,
        },
        (x) => x !== null && (!Array.isArray(x) || x.length > 0)
      )
    ),
  }));
}
