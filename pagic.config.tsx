import { React } from "https://deno.land/x/pagic/mod.ts";

export default {
  srcDir: ".",
  exclude: ["LICENSE", "README.md"],
  root: "/library/",
  theme: "docs",
  plugins: ["sidebar"],
  title: "Sanny Commands Library",
  description: "Sanny Commands Library",
  head: (
    <>
      <link
        rel="icon"
        type="image/png"
        href="https://sannybuilder.com/favicon.png"
      />
      <link
        href="/library/assets/main.css?up=3"
        rel="stylesheet"
        type="text/css"
      />
    </>
  ),
  nav: [
    {
      text: "Sanny Builder",
      link: "https://sannybuilder.com",
      align: "right",
    },
  ],
  github: "https://github.com/sannybuilder/library",
  sidebar: {
    "/": [
      {
        text: "GTA III",
        children: [
          {
            text: "Commands",
            link: "gta3/index.md",
          },
          {
            text: "Classes list",
            link: "gta3/classes.md",
          },
          {
            text: "Download classes.db",
            link: "gta3/classes.db",
          },
        ],
      },
      {
        text: "GTA Vice City",
        children: [
          {
            text: "Commands",
            link: "vc/index.md",
          },
          {
            text: "Classes list",
            link: "vc/classes.md",
          },
          {
            text: "Download classes.db",
            link: "vc/classes.db",
          },
        ],
      },
    ],
  },
  tools: {
    editOnGitHub: true,
    backToTop: true,
  },
};
