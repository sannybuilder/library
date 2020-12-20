import projectConfig from '/classes/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "README.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "Sanny Classes Library",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Sanny Classes Library</h1>\n<p>An attempt to build a complete and consistent class system spanning GTA 3D series games. Heavily based on original naming conventions.</p>\n<p>Currently under early development. Contributions are welcome!</p>\n<p>See online at <a href="https://sannybuilder.github.io/classes/">https://sannybuilder.github.io/classes/</a></p>\n<p>Discuss: <a href="https://github.com/sannybuilder/dev/discussions/107">https://github.com/sannybuilder/dev/discussions/107</a></p>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { href: "/classes/assets/main.css?up=2", rel: "stylesheet", type: "text/css" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/classes/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Sanny Classes Library"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>An attempt to build a complete and consistent class system spanning GTA 3D series games. Heavily based on original naming conventions.</p>\n<p>Currently under early development. Contributions are welcome!</p>\n<p>See online at <a href="https://sannybuilder.github.io/classes/">https://sannybuilder.github.io/classes/</a></p>\n<p>Discuss: <a href="https://github.com/sannybuilder/dev/discussions/107">https://github.com/sannybuilder/dev/discussions/107</a></p>'
        } }),
    'toc': null,
    'author': "Seemann",
    'contributors': [
        "Seemann"
    ],
    'date': "2020-12-16T03:49:54.000Z",
    'updated': null,
    'excerpt': "An attempt to build a complete and consistent class system spanning GTA 3D series games. Heavily based on original naming conventions. Currently under early development. Contributions are welcome! See online at...",
    'cover': undefined,
    'sidebar': [
        {
            "text": "GTA III",
            "children": [
                {
                    "text": "Commands",
                    "link": "gta3/index.html",
                    "pagePath": "gta3/index.md"
                },
                {
                    "text": "Classes list",
                    "link": "gta3/classes.html",
                    "pagePath": "gta3/classes.md"
                }
            ]
        }
    ]
};
