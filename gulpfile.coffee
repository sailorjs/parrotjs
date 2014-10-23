'use strict'

# -- Dependencies -------------------------------------------------------------

gulp    = require 'gulp'
rename  = require 'gulp-rename'
concat  = require 'gulp-concat'
coffee  = require 'gulp-coffee'
header  = require 'gulp-header'
uglify  = require 'gulp-uglify'
gutil   = require 'gulp-util'
connect = require 'gulp-connect'
open    = require 'gulp-open'
pkg     = require './package.json'

# -- Files --------------------------------------------------------------------

path =
  core:
    src   : [ 'source/parrot.coffee'
              'source/parrot.initialize.coffee'
              'source/parrot.endpoint.coffee'
              'source/parrot.url.coffee'
              'source/parrot.storage.coffee' ]
    dist  : 'dist'

  test:
    src   : [ 'test/source/test.coffee' ]
    dist  : 'test/dist'
    index : 'test/index.html'

banner = [ "/**"
           " * <%= pkg.name %> - <%= pkg.description %>"
           " * @version v<%= pkg.version %>"
           " * @link    <%= pkg.homepage %>"
           " * @author  <%= pkg.author.name %> (<%= pkg.author.url %>)"
           " * @license <%= pkg.license %>"
           " */"
           "" ].join("\n")

# -- Tasks --------------------------------------------------------------------

gulp.task 'develop', ->
  gulp.src path.core.src
  .pipe concat 'parrot'
  .pipe coffee().on 'error', gutil.log
  .pipe header banner, pkg: pkg
  .pipe gulp.dest path.core.dist
  .pipe connect.reload()
  return

gulp.task 'production', ->
  gulp.src path.core.src
  .pipe concat 'parrot'
  .pipe rename('parrot.min.js')
  .pipe coffee().on 'error', gutil.log
  .pipe uglify()
  .pipe header banner, pkg: pkg
  .pipe gulp.dest path.core.dist
  .pipe connect.reload()
  return

gulp.task 'mocha', ->
  gulp.src path.test.src
  .pipe coffee().on 'error', gutil.log
  .pipe gulp.dest path.test.dist
  .pipe connect.reload()
  return

gulp.task 'server', ->
  connect.server
    port       : 8000
    root       : 'test'
    livereload : true
  return

gulp.task 'browser', ->
  gulp.src path.test.index
  .pipe open()
  return

gulp.task 'test', ->
  gulp.start ['develop', 'mocha', 'server', 'browser']
  gulp.watch path.core.src, ['develop']
  gulp.watch path.test.src, ['mocha']
  return

gulp.task 'build', ->
  gulp.start ['develop', 'production']
  return

gulp.task 'default', ->
  gulp.start 'build'
  return
