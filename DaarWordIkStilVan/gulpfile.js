/// <binding ProjectOpened='watch' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

/*
respond / respond-minmax
html5shiv

"libs-main-js": {
"libTarget": "./content/libs.min.js",
"libInclude": [ "bower_components/xx/x.js", "!bower_components/html5shiv/xx/x.js", "!bower_components/respond/xx/x.js" ]
},
"legacy-ie-support": {
"libTarget": "./content/legacy-ie-support.min.js",
"libInclude": [ "bower_components/html5shiv/xx/x.js", "bower_components/respond/xx/x.js" ]
}
*/

//require("es6-promise");

var gulp = require("gulp");
var del = require("del");
var notifier = require("node-notifier");
var merge = require("merge2");

var plugins = require("gulp-load-plugins")();
var bowerfiles = require("bower-files")();
var mainbowerfiles = require("main-bower-files")();

var config = require("./gulpfile.config.json");
var paths = config.paths;

var tsProject = plugins.typescript.createProject("./content/ts/tsconfig.json", { sortOutput: true });
//var tsProject = plugins.typescript.createProject("./content/ts/tsconfig.json", { sortOutput: true, declaration: true });

gulp.task("default", ["watch"]);

gulp.task("watch", function () {
    plugins.util.log("Watching for LESS changes.");
    var watcherLess = gulp.watch(paths.less.watch, ["less"]);
    watcherLess.on("change", function (event) {
        watchFileDeletion(event, "less");
    });

    plugins.util.log("Watching for CSS changes.");
    var watcherCss = gulp.watch(paths.css.watch, ["min:css"]);
    watcherCss.on("change", function (event) {
        watchFileDeletion(event, "mincss");
    });

    plugins.util.log("Watching for TS changes.");
    var watcherTs = gulp.watch(paths.ts.watch, ["ts"]);
    watcherTs.on("change", function (event) {
        watchFileDeletion(event, "ts");
    });

    plugins.util.log("Watching for JS changes.");
    var watcherJs = gulp.watch(paths.js.watch, ["min:js"]);
    watcherJs.on("change", function (event) {
        watchFileDeletion(event, "minjs");
    });

    //plugins.util.log("Watching for Views changes.");
    //gulp.watch(paths.views.watch, function (event) {
    //    gulp.src(event.path, { base: paths.webroot })
    //        .pipe(plugins.livereload());
    //});

    plugins.util.log("Watching for Library changes.");
    var watcherLibs = gulp.watch(paths.libsWatch, ["libs"]);
    watcherLibs.on("change", function (event) {
        watchFileDeletion(event, "libs");
    });

    plugins.util.log("Listening for Livereload.");
    plugins.livereload.listen();
    ////plugins.livereload.listen({ port: "", host: "" });
    ////plugins.livereload.listen({ basePath: "" });
    ////plugins.livereload.listen({ reloadPage: "index.html" });

    notifier.notify({ title: "Gulp", message: "Watching for changes." });
});

function watchFileDeletion(event, cacheName) {
    if (event.type === "deleted") {
        delete plugins.cached.caches[cacheName][event.path];
        plugins.remember.forget(cacheName, event.path);
    }
}

gulp.task("clean", ["clean:less", "clean:css", "clean:ts", "clean:js", "clean:libs"]);

gulp.task("clean:less", function () {
    del(paths.less.target);
});

gulp.task("clean:css", function () {
    del(paths.css.target);
});

gulp.task("clean:ts", function () {
    del(paths.ts.target);
});

gulp.task("clean:js", function () {
    del(paths.js.target);
});

gulp.task("clean:libs", function () {
    var libs = config.libs;
    for (var libExt in libs) {
        if (libs.hasOwnProperty(libExt)) {
            // Loop through all libraries per extension
            var libsExt = libs[libExt];
            for (var libKey in libsExt) {
                if (libsExt.hasOwnProperty(libKey)) {
                    // Get the library data for this particular library
                    var libData = libsExt[libKey];

                    // Delete the target
                    del(libData.libTarget);
                }
            }
        }
    }
});

gulp.task("min", ["min:css", "min:js"]);

gulp.task("min:css", function () {
    gulp.src(paths.css.source, { base: paths.webroot })
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.cached("mincss"))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cssmin({ keepSpecialComments: "0" }))
        .pipe(plugins.remember("mincss"))
        .pipe(plugins.concat(paths.css.target))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.webroot))
        .pipe(plugins.livereload());

    notifier.notify({ title: "CSS Minification", message: "CSS Minification was succesful" });

    //.pipe(plugins.sourcemaps.init({ loadMaps: true }))
    //.pipe(plugins.sourcemaps.write(".", { sourceRoot: paths.webroot }))
    //.pipe(plugins.autoprefixer({ browsers: ["> 1%", "last 2 versions", "Firefox ESR"] }))
    //cssmin > keepSpecialComments: * for keeping all (default), 1 for keeping first one only, 0 for removing all
});

gulp.task("min:js", function () {
    gulp.src(paths.js.source, { base: paths.webroot })
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.cached("minjs"))
        .pipe(plugins.uglify())
        .pipe(plugins.remember("minjs"))
        .pipe(plugins.concat(paths.js.target))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.webroot))
        .pipe(plugins.livereload());

    notifier.notify({ title: "Javascript Minification", message: "Javascript Minification was succesful" });

    //.pipe(plugins.sourcemaps.init({ loadMaps: true, debug: true }))
    //.pipe(plugins.sourcemaps.write("../maps", { debug: true }))
});

gulp.task("less", function () {
    gulp.src(paths.less.source, { base: paths.webroot })
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less({ paths: paths.less.includePaths }))
        .pipe(plugins.debug())
        .pipe(plugins.concat(paths.less.target))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.webroot));

    notifier.notify({ title: "LESS Compile", message: "LESS compilation was succesful" });

    //.pipe(plugins.cached("less"))
    //.pipe(plugins.remember("less"))
    //.pipe(plugins.sourcemaps.write(".", { sourceRoot: paths.webroot }))
});

gulp.task("ts", function () {
    gulp.src(paths.ts.source, { base: paths.webroot })
        .pipe(plugins.debug())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.typescript(tsProject))
        .pipe(plugins.concat(paths.ts.target))
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.debug())
        .pipe(gulp.dest(paths.webroot));

    //var tsResult = gulp.src(paths.ts.source, { base: paths.webroot })
    //    .pipe(plugins.debug())
    //    .pipe(plugins.sourcemaps.init())
    //    .pipe(plugins.typescript(tsProject));

    //merge([
    //    tsResult.dts
    //        .pipe(plugins.concat(paths.ts.dtsTarget))
    //        .pipe(plugins.debug())
    //        .pipe(gulp.dest(paths.webroot)),
    //    tsResult.js
    //        .pipe(plugins.concat(paths.ts.target))
    //        .pipe(plugins.sourcemaps.write())
    //        .pipe(plugins.debug())
    //        .pipe(gulp.dest(paths.webroot))
    //]);

    notifier.notify({ title: "TS Compile", message: "TS compilation was succesful" });
});

gulp.task("libs", function () {
    var libs = config.libs;
    for (var libExt in libs) {
        if (libs.hasOwnProperty(libExt)) {
            // Loop through all libraries per extension
            var libsExt = libs[libExt];
            for (var libKey in libsExt) {
                if (libsExt.hasOwnProperty(libKey)) {
                    // Get the library data for this particular library
                    var libData = libsExt[libKey];
                    plugins.util.log("Building " + libKey);

                    // Concatenate the libraries files into one file
                    var pipeResult = gulp.src(mainbowerfiles, { base: paths.webroot })
                        .pipe(plugins.filter(libData.libInclude))
                        .pipe(plugins.debug())
                        .pipe(plugins.concat(libData.libTarget));

                    // Depending on the library extension, perform an action
                    switch (libExt) {
                        case "js":
                            // In case of Javascript: uglify the result
                            pipeResult = pipeResult.pipe(plugins.uglify());
                            break;
                        case "css":
                            // In case of CSS: minify the result
                            pipeResult = pipeResult.pipe(plugins.cssmin({ keepSpecialComments: "0" }));
                            break;
                    }

                    pipeResult.pipe(gulp.dest(paths.webroot));
                    plugins.util.log(libData.libTarget);
                }
            }
        }
    }

    notifier.notify({ title: "Library Compile", message: "Library compilation was succesful" });

    //gulp.src(bowerfiles.ext(libExt).files, { base: paths.webroot })
    //.pipe(plugins.cached("libs"))
    //.pipe(plugins.remember("libs"))
    //cssmin > keepSpecialComments: * for keeping all (default), 1 for keeping first one only, 0 for removing all
});

//gulp.task("min:images", function() {
//    .pipe(imagemin())
//    .pipe(imagemin({ svgoPlugins: [{ removeViewBox: false }] }))
//});

//gulp.task("libs:css", function () {
//    var libsCss = config.libs.css;
//    for (var libKey in libsCss) {
//        if (libsCss.hasOwnProperty(libKey)) {
//            var libData = libsCss[libKey];
//            plugins.util.log("Building " + libKey);
//            gulp.src(mainbowerfiles, { base: paths.webroot })
//                .pipe(plugins.filter(libData.libInclude))
//                //.pipe(plugins.debug())
//                .pipe(plugins.concat(libData.libTarget))
//                .pipe(plugins.cssmin({ keepSpecialComments: "0" }))
//                .pipe(gulp.dest(paths.webroot));
//            plugins.util.log(libData.libTarget);
//        }
//    }
//});

//gulp.task("libs:js", function () {
//    var libsJs = config.libs.js;
//    for (var libKey in libsJs) {
//        if (libsJs.hasOwnProperty(libKey)) {
//            var libData = libsJs[libKey];
//            plugins.util.log("Building " + libKey);
//            gulp.src(mainbowerfiles, { base: paths.webroot })
//                .pipe(plugins.filter(libData.libInclude))
//                //.pipe(plugins.debug())
//                .pipe(plugins.concat(libData.libTarget))
//                .pipe(plugins.uglify())
//                .pipe(gulp.dest(paths.webroot));
//            plugins.util.log(libData.libTarget);
//        }
//    }
//});

//gulp.task("libs-get-fonts", function () {
//    var fontFiles = bowerfiles.join({ fonts: ["eot", "svg", "ttf", "woff", "woff2"] });
//    gulp.src(fontFiles.ext("fonts").files)
//        .pipe(gulp.dest(paths.libsDestFonts));

//    //gulp.src(mainbowerfiles)
//    //    .pipe(gulpfilter(["**/*.eot", "**/*.svg", "**/*.ttf", "**/*.woff", "**/*.woff2"]))
//    //    .pipe(gulp.dest(paths.libsDestFonts));
//});