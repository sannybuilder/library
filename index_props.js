import projectConfig from '/classes/pagic.config.js';
import Page from './index_content.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "index.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "",
    'content': React.createElement(Page, { config: {
            branch: 'master',
            description: 'Sanny Classes Library',
            exclude: [
                '**/.*',
                '**/package.json',
                '**/package-lock.json',
                '**/node_modules',
                'pagic.config.ts',
                'pagic.config.tsx',
                '**/config.gypi',
                '**/CVS',
                '**/npm-debug.log',
                'LICENSE',
                'README.md',
                'dist'
            ],
            github: 'https://github.com/sannybuilder/classes',
            head: React.createElement(React.Fragment, null,
                React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
                React.createElement("link", { href: "/classes/assets/main.css?up=2", rel: "stylesheet", type: "text/css" })),
            include: undefined,
            nav: [
                {
                    align: 'right',
                    link: 'https://sannybuilder.com',
                    text: 'Sanny Builder'
                }
            ],
            outDir: 'dist',
            plugins: [
                'clean',
                'init',
                'md',
                'tsx',
                'script',
                'layout',
                'out',
                'sidebar'
            ],
            port: 8000,
            root: '/classes/',
            serve: false,
            sidebar: {
                '/': [
                    {
                        children: [
                            {
                                link: 'gta3/index.md',
                                text: 'Commands'
                            },
                            {
                                link: 'gta3/classes.md',
                                text: 'Classes list'
                            },
                            {
                                link: 'gta3/classes.db',
                                text: 'Download classes.db'
                            }
                        ],
                        text: 'GTA III'
                    }
                ]
            },
            srcDir: '.',
            theme: 'docs',
            title: 'Sanny Classes Library',
            tools: {
                backToTop: true,
                editOnGitHub: true
            },
            watch: false
        }, content: null, head: React.createElement(React.Fragment, null,
            React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
            React.createElement("link", { href: "/classes/assets/main.css?up=2", rel: "stylesheet", type: "text/css" })), layoutPath: "_layout.tsx", outputPath: "index.html", pagePath: "index.tsx", script: null, title: "" }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { href: "/classes/assets/main.css?up=2", rel: "stylesheet", type: "text/css" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/classes/index.js", type: "module" })),
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
        }
    ]
};
