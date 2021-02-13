import projectConfig from '/library/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "gta3/0001.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "gta3/0001.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="0001">0001<a class="anchor" href="#0001">§</a></h3>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { href: "/library/assets/main.css?up=3", rel: "stylesheet", type: "text/css" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/library/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h3 id="0001">0001<a class="anchor" href="#0001">§</a></h3>'
        } }),
    'toc': React.createElement("nav", { key: "0", className: "toc" },
        React.createElement("ol", null,
            React.createElement("li", null,
                React.createElement("a", { href: "#0001" }, "0001")))),
    'author': "Seemann",
    'contributors': [
        "Seemann"
    ],
    'date': "2021-02-13T04:36:28.000Z",
    'updated': null,
    'excerpt': "0001",
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
                },
                {
                    "text": "Download classes.db",
                    "link": "gta3/classes.db"
                }
            ]
        },
        {
            "text": "GTA Vice City",
            "children": [
                {
                    "text": "Commands",
                    "link": "vc/index.html",
                    "pagePath": "vc/index.md"
                },
                {
                    "text": "Classes list",
                    "link": "vc/classes.html",
                    "pagePath": "vc/classes.md"
                },
                {
                    "text": "Download classes.db",
                    "link": "vc/classes.db"
                }
            ]
        }
    ]
};
