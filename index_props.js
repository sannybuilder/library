import projectConfig from '/classes/pagic.config.js';
export default {
    'prev': undefined,
    'next': {
        "link": "gta3/index.html"
    },
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "index.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<ul>\n<li><a href="gta3/index.html">GTA 3 Commands</a></li>\n<li><a href="gta3/classes.html">GTA 3 Classes list</a></li>\n</ul>'
        } }),
    'head': null,
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
            "link": "index.html",
            "pagePath": "index.md"
        },
        {
            "link": "gta3/index.html",
            "children": [
                {
                    "link": "gta3/index.html",
                    "pagePath": "gta3/index.md"
                },
                {
                    "link": "gta3/classes.html",
                    "pagePath": "gta3/classes.md"
                }
            ],
            "pagePath": "gta3/index.md"
        },
        {
            "text": "GTA 3",
            "children": [
                {
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
