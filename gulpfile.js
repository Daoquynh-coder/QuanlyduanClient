var gulp = require('gulp');
var war = require('gulp-war');
var zip = require('gulp-zip');

const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;
  for (i = 0; i < argList.length; i++)
  {
    if(argList[i].indexOf('--') == 0)
    {
      var parts = argList[i].trim().replace(/^\-+/, '').split('=');
      arg[parts[0]] = parts[1];
    }
  }
  return arg;
}) (process.argv);

gulp.task('default', defaultTask);

function defaultTask(done) {
  // place code for your default task here
  done();
}

gulp.task('war', function () {
  var context_path = arg['context-path'] ? arg['context-path'] : '';
  context_path = context_path.replace('/', "#");

  var ver = arg['ver'] ? '##' + arg['ver'] : '';

  gulp.src(["dist/**"])
    .pipe(war({
       welcome: 'index.html',
       displayName: 'AngularKIT',
     }))
     .pipe(zip(context_path + ver + '.war'))
     .pipe(gulp.dest("./bin"));
});