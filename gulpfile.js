const fs = require('fs');
const path = require('path');
const gulp= require('gulp');
const ftp = require( 'vinyl-ftp' );
const gutil = require( 'gulp-util' );

const DIST = './build';

gulp.task('html',()=>{
  return gulp.src('./src/*.html')  
    .pipe(gulp.dest(DIST));
});

gulp.task('p',['html'], ()=>{


  const user = fs.readFileSync('E:\\ftp_id.txt','utf-8');
  const password = fs.readFileSync('E:\\ftp_pwd.txt','utf-8');
  const host = fs.readFileSync('E:\\ftp_host_bizdev.txt','utf-8');
  const conn = ftp.create( {
    host,
    user,
    password,
    parallel: 10,
    log: gutil.log,
  });
  return gulp.src( './build/*', { base: '.', buffer: false } )
    .pipe( conn.newer( '/bizdev.medialand.com.tw/milkmidi/' ) ) // only upload newer files
    .pipe( conn.dest( '/bizdev.medialand.com.tw/milkmidi/' ) );
})

gulp.task('default',['html'],() => {
  console.log('hi gulp');
});