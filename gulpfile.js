const gulp = require('gulp');
var octo = require("@octopusdeploy/gulp-octo");

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
