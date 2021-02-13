import projectConfig from '/library/pagic.config.js';
import Page from './index_content.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "index.tsx",
    'layoutPath': "_layout.tsx",
    'outputPath': "index.html",
    'title': "",
    'content': React.createElement(Page, { config: {
            branch: 'master',
            description: 'Sanny Commands Library',
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
            github: 'https://github.com/sannybuilder/library',
            head: React.createElement(React.Fragment, null,
                React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
                React.createElement("link", { href: "/library/assets/main.css?up=3", rel: "stylesheet", type: "text/css" })),
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
            root: '/library/',
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
                    },
                    {
                        children: [
                            {
                                link: 'vc/index.md',
                                text: 'Commands'
                            },
                            {
                                link: 'vc/classes.md',
                                text: 'Classes list'
                            },
                            {
                                link: 'vc/classes.db',
                                text: 'Download classes.db'
                            }
                        ],
                        text: 'GTA Vice City'
                    }
                ]
            },
            srcDir: '.',
            theme: 'docs',
            title: 'Sanny Commands Library',
            tools: {
                backToTop: true,
                editOnGitHub: true
            },
            watch: false
        }, content: null, head: React.createElement(React.Fragment, null,
            React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
            React.createElement("link", { href: "/library/assets/main.css?up=3", rel: "stylesheet", type: "text/css" })), layoutPath: "_layout.tsx", outputPath: "index.html", pagePath: "index.tsx", script: null, title: "" }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { href: "/library/assets/main.css?up=3", rel: "stylesheet", type: "text/css" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/library/index.js", type: "module" })),
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
