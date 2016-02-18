'use strict';

var gulp       = require('gulp'),
    source     = require('vinyl-source-stream'),
    rename     = require('gulp-rename'),
    browserify = require('browserify'),
    glob       = require('glob'),
    es         = require('event-stream');

gulp.task('browserify', function(done) {
  glob('./test/**_test.js', function(err, files) {
    if(err) done(err);

    var tasks = files.map(function(entry) {
      return browserify({ entries: [entry] })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          extname: '.browser.js'
        }))
      .pipe(gulp.dest('./test/browser'));
    });
    es.merge(tasks).on('end', done);
  })
});
