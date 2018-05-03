'use strict';

// Load Node Modules/Plugins
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import fs from 'fs';

const reload = browserSync.reload;
const $ = gulpLoadPlugins();

const onError = function (err) {
  // gutil.beep();
  console.log(err);
};

// Remove existing docs and dist build
gulp.task('clean', del.bind(null, ['docs/dist', 'dist']));

// Build LibSass files
gulp.task('styles', function() {
  gulp.src('src/main.scss')
  .pipe($.plumber({errorHandler: onError}))
  .pipe($.sourcemaps.init())
  .pipe($.sass({includePaths: ['node_modules']}).on('error', $.sass.logError))
  .pipe($.autoprefixer({browsers: ['last 1 version']}))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css'))
  .pipe($.minifyCss())
  .pipe($.rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist/css'));
});
 
// function compile2() {
//   var b = browserify({
//     entries: ['src/index.js'],
//     cache: {},
//     packageCache: {},
//     paths: ['src/'],
//     // plugin: [watchify]
//   })
//   .transform('babelify')
//   .transform('aliasify', {
//     aliases: {
//       'underscore': 'lodash'
//     }
//   })
//   .plugin(watchify);
//
//   function bundle() {
//     return b.bundle()//.pipe(fs.createWriteStream('dist/bundle.js'));
//     // .pipe($.plumber({errorHandler: onError}))
//     .on('error', function(err) { console.error(err); this.emit('end'); })
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
//     .pipe($.sourcemaps.init({ loadMaps: true }))
//     .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest('dist/js/'));;
//   }
//
//   // b.on('update', bundle);
//   bundle();
// }

function compile(watch) {
  const bundler = watchify(
    browserify({
      entries: ['./src/index.js'],
      cache: {},
      packageCache: {},
      debug: false,
      paths: ['src/']
    })
    .transform('babelify')
    .transform('aliasify', {
      aliases: {
        'underscore': 'lodash'
      }
    })
  );

  function rebundle() {
    bundler.bundle()
      // .pipe($.plumber({errorHandler: onError}))
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('dist/js/'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};


// Build JavaScript files
gulp.task('scripts', function() {
  return compile();
});

// Watch tasks
gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('js/src/*.js', ['scripts']);
});

gulp.task('dist', ['styles', 'scripts']);
gulp.task('default', ['clean'], () => {
  gulp.start('dist');
});
