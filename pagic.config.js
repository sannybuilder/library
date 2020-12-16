// import { React } from 'https://deno.land/x/pagic/mod.ts';
export default {
    srcDir: '.',
    exclude: ['LICENSE'],
    root: '/classes/',
    theme: 'docs',
    plugins: ['sidebar', 'prev_next'],
    title: 'Sanny Classes Library',
    description: 'Sanny Classes Library',
    // head: <>
    //   <link rel="icon" type="image/png" href="/favicon.png" />
    //   <script src="/assets/custom.js" />
    // </>,
    nav: [
        {
            text: 'GTA 3',
            link: '/classes/gta3/',
        },
        {
            text: 'About',
            link: '/about/index.html',
            align: 'right',
        },
    ],
    github: 'https://github.com/sannybuilder/classes',
    sidebar: {
        '/': [
            'index.md',
            {
                link: 'gta3/index.md',
                children: ['gta3/index.md', 'gta3/classes.md'],
            },
            {
                text: 'GTA 3',
                children: [
                    'gta3/index.md',
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
    port: 8000,
};
