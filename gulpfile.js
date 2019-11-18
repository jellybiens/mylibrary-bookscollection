const {
  src,
  dest,
  task,
  watch,
  parallel,
} = require( 'gulp' );

const uglify = require( 'gulp-uglify' );
const sass = require( 'gulp-sass' );
const babelify = require( 'babelify' );
const browserify = require( 'browserify' );
const source = require( 'vinyl-source-stream' );
const buffer = require( 'vinyl-buffer' );
const rename = require( 'gulp-rename' );

const browserSync = require( 'browser-sync' ).create();
const historyApiFallback = require( 'connect-history-api-fallback' );

const styleSRC = './src/scss/*.scss';
const styleDEST = './public/css/';

const jsSRC = './src/js/index.js';
const jsDEST = './public/js/';

const styleWatch = './src/scss/**/*.scss';
const jsWatch = './src/js/**/*.js';

// eslint-disable-next-line camelcase
const browser_sync = () => {
  browserSync.init( {
    server: {
      baseDir: './public/',
      middleware: [historyApiFallback()],
    },
  } );
};

const reload = ( done ) => {
  browserSync.reload();
  done();
};

const css = ( done ) => {
  src( styleSRC )
      .pipe( sass().on( 'error', sass.logError ) )
      .pipe( rename( { suffix: '.min' } ) )
      .pipe( dest( styleDEST ) );
  done();
};

const js = ( done ) => {
  browserify( jsSRC )
      .transform(
          babelify,
          {
            presets: ['@babel/env', '@babel/react'],
            plugins: [
              [
                '@babel/plugin-proposal-class-properties',
                '@babel/syntax-dynamic-import',
              ],
            ],
          },
      )
      .bundle()
      .pipe( source( 'index.js' ) )
      .pipe( rename( {
        extname: '.min.js',
      } ) )
      .pipe( buffer() )
      .pipe( uglify() )
      .pipe( dest( jsDEST ) )
      .pipe( browserSync.stream() );

  done();
};

// eslint-disable-next-line camelcase
const watch_files = () => {
  watch( styleWatch, css );
  watch( jsWatch, js );
  watch( jsDEST + 'index.min.js', reload );
  watch( styleDEST + 'style.min.js', reload );
};

task( 'css', css );
task( 'js', js );
task( 'default', parallel( css, js ) );
task( 'watch', parallel( browser_sync, watch_files ) );
