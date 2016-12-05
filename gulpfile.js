const gulp = require('gulp');
var octo = require("@octopusdeploy/gulp-octo");
var OctoDeployApi = require('octopus-deploy');

gulp.task("hello", function() {
    console.log('Hello world.');
});

// !! DO NOT COMMIT WITH ACTUAL VALUES !!
var octoConfig = {
    host: "TODO, put your host here",
    apiKey: "TODO, put your api key here"
};

// You need to bump version in package.json and ng build before running this
gulp.task("publish", function() {
    //make sure package.json is not cached
    delete require.cache[require.resolve("./package.json")];

    return gulp.src(["dist/**"])
        .pipe(octo.pack())
        .pipe(octo.push(octoConfig));
});

gulp.task("deploy", ["publish"], function() {
    var client = new OctoDeployApi(octoConfig);
    var projectIdOrSlug = 'my-project-id';
    var version = require('./package.json').version;
    var releaseNotes = '';
    var packageVersion = version;

    var environmentName = 'My Test Environment';
    var comments = 'CI deploy';
    return client.helper.simpleCreateReleaseAndDeploy(projectIdOrSlug, version, releaseNotes, environmentName, comments, null, packageVersion)
      .then(function (deployment) {
        console.log('Octopus release created and deployed:');
        console.log(deployment);
      }, function (reason) {
        console.log('Octopus release creation or deployment failed!');
        console.log(reason);
    });
})
