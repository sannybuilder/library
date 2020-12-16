import projectConfig from '/classes/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "index.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<ul>\n<li><a href="gta3/index.html">GTA 3 Commands</a></li>\n<li><a href="gta3/classes.html">GTA 3 Classes list</a></li>\n</ul>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { href: "/assets/main.css?up=1", rel: "stylesheet", type: "text/css" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/classes/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<ul>\n<li><a href="gta3/index.html">GTA 3 Commands</a></li>\n<li><a href="gta3/classes.html">GTA 3 Classes list</a></li>\n</ul>'
        } }),
    'toc': null,
    'author': "x87",
    'contributors': [
        "x87",
        "Seemann"
    ],
    'date': "2020-12-13T23:33:37.000Z",
    'updated': "2020-12-16T02:26:34.000Z",
    'excerpt': " - GTA 3 Commands - GTA 3 Classes list",
    'cover': undefined,
    'sidebar': [
        {
            "text": "GTA 3",
            "children": [
                {
                    "text": "GTA 3 Commands",
                    "link": "gta3/index.html",
                    "pagePath": "gta3/index.md"
                },
                {
                    "text": "GTA 3 Classes list",
                    "link": "gta3/classes.html",
                    "pagePath": "gta3/classes.md"
                }
            ]
        }
    ]
};
