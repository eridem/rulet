'use strict'

var gulp = require('gulp')
var mocha = require('gulp-mocha')

var ts = require('gulp-typescript')
var merge = require('merge2')

var tsProject = ts.createProject('tsconfig.json')

gulp.task('op:clean', function () {})

gulp.task('op:test', function () {
  return gulp.src('dist/test/**/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mocha({reporter: 'nyan'}))
})

gulp.task('ts:compile', function () {
  var tsResult = tsProject.src()
    .pipe(ts(tsProject))

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/definitions')),
    tsResult.js.pipe(gulp.dest('dist'))
  ])
})

gulp.task('npm:pretest', ['op:clean', 'ts:compile'])
gulp.task('npm:test', ['op:test'])
gulp.task('npm:prepublish', ['op:clean', 'ts:compile', 'op:test'])

gulp.task('build', ['op:clean', 'ts:compile'], function () {
  gulp.watch(['ts/**/*.ts', 'tsconfig.json'], ['op:clean', 'ts:compile'])
  gulp.watch(['test/**/*.ts', 'tsconfig.json'], ['op:clean', 'ts:compile'])
})
