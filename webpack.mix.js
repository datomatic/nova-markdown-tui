let mix = require('laravel-mix');

mix
  .setPublicPath('dist')
  .js('resources/js/entry.js', 'js')
  .vue({ version: 3 })
  .webpackConfig({
    // stats: { children: true },
    externals: {
      vue: 'Vue',
      'laravel-nova': 'LaravelNova',
    },
    output: {
      uniqueName: 'datomatic/nova-markdown-tui',
    },
  })
  .postCss('resources/css/entry.pcss', 'dist/css/');
