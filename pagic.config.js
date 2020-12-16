export default {
    srcDir: '.',
    exclude: ['LICENSE'],
    root: '/classes/',
    theme: 'docs',
    plugins: ['sidebar'],
    title: 'Sanny Classes Library',
    description: 'Sanny Classes Library',
    head: (React.createElement(React.Fragment, null,
        React.createElement("link", { rel: "icon", type: "image/png", href: "https://sannybuilder.com/favicon.png" }),
        React.createElement("link", { href: '/assets/main.css?up=1', rel: 'stylesheet', type: 'text/css' }))),
    nav: [
        {
            text: 'Sanny Builder',
            link: 'https://sannybuilder.com',
            align: 'right',
        },
    ],
    github: 'https://github.com/sannybuilder/classes',
    sidebar: {
        '/': [
            {
                text: 'GTA 3',
                children: [
                    {
                        text: 'GTA 3 Commands',
                        link: 'gta3/index.md'
                    },
                    {
                        text: 'GTA 3 Classes list',
                        link: 'gta3/classes.md'
                    }
                ]
            }
        ],
    },
    tools: {
        editOnGitHub: true,
        backToTop: true,
    },
};
