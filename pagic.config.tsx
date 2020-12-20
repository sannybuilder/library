import { React } from 'https://deno.land/x/pagic/mod.ts';

export default {
    srcDir: '.',
    exclude: ['LICENSE', 'README.md'],
    root: '/classes/',
    theme: 'docs',
    plugins: ['sidebar'],
    title: 'Sanny Classes Library',
    description: 'Sanny Classes Library',
    head: (<>
      <link rel="icon" type="image/png" href="https://sannybuilder.com/favicon.png" />
      <link href='/classes/assets/main.css?up=2' rel='stylesheet' type='text/css' />
    </>),
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
          text: 'GTA III',
          children: [
            {
              text: 'Commands',
              link: 'gta3/index.md'
            },
            {
              text: 'Classes list',
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