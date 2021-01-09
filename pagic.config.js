export default {
    srcDir: ".",
    exclude: ["LICENSE", "README.md"],
    root: "/classes/",
    theme: "docs",
    plugins: ["sidebar"],
    title: "Sanny Classes Library",
    description: "Sanny Classes Library",
    head: (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "icon", type: "image/png", href: "https://sannybuilder.com/favicon.png" }),
        React.createElement("link", { href: "/classes/assets/main.css?up=3", rel: "stylesheet", type: "text/css" }))),
    nav: [
        {
            text: "Sanny Builder",
            link: "https://sannybuilder.com",
            align: "right",
        },
    ],
    github: "https://github.com/sannybuilder/classes",
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
