var gulp = require('gulp');
var git = require('gulp-git');
var shell = require('gulp-shell');

// Clone a remote repo
gulp.task('clone', function(){
   return git.clone('https://github.com/jonbaierCTP/getting-started-with-kubernetes.git', function (err) {
     if (err) throw err;
   });
});

// Update codebase
gulp.task('pull', function(){
  return git.pull('origin', 'master', {cwd: './getting-started-with-kubernetes'}, function (err) {
    if (err) throw err;
  });
});

//Build Docker Image
gulp.task('docker-build', shell.task([
  'docker build -t jonbaier/node-gulp:latest ./getting-started-with-kubernetes/container-info/',
  'docker push jonbaier/node-gulp:latest'
]));

//Run New Pod
gulp.task('create-kube-pod', shell.task([
  'kubectl.sh create -f node-gulp-controller.yaml',
  'kubectl.sh create -f node-gulp-service.yaml'
]));

//Update Pod
gulp.task('update-kube-pod', shell.task([
  'kubectl.sh delete -f node-gulp-controller.yaml',
  'kubectl.sh create -f node-gulp-controller.yaml'
]));