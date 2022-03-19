const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/dashboard.js', 'public/js')
    .react()
    .sass('resources/sass/dashboard.scss', 'public/css');

mix.js('resources/js/website.js', 'public/js')
    .react()
    .sass('resources/sass/website.scss', 'public/css')
    .sourceMaps(false, 'source-map');