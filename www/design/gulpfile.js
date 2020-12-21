const gulp = require("gulp");

// This import is used to delete folders
const del = require("del");

// This import detects if files have changed
const changed = require("gulp-changed");

// The following imports are for the SCSS/CSS
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
// The following imports are the processors for postcss
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const cssmqpacker = require("@hail2u/css-mqpacker");

// The following imports are for the Javascript
const concat = require("gulp-concat");
const terser = require("gulp-terser");

// The following imports are for the images
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const giflossy = require("imagemin-giflossy");
const zopfli = require("imagemin-zopfli");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");

// For serving the content
const browserSync = require("browser-sync");

const paths = {
    styles: {
        src: "src/scss/**/*.scss",
        dest: "dist/css",
    },
    scripts: {
        src: "src/js/**/*.js",
        dest: "dist/js",
    },
    images: {
        src: "src/images/**/*.{jpg,jpeg,png,svg,gif}",
        dest: "dist/images",
    },
    static: {
        src: "src/**/*.{php,html,ini,htaccess,xml,ico,json}",
        dest: "dist",
    },
};

// --------------------------------------------------------------------------------------
// Basic functions
// --------------------------------------------------------------------------------------
const clean = () => del(["dist"]);

// --------------------------------------------------------------------------------------
// SCSS/CSS functions
// --------------------------------------------------------------------------------------
const postcssProcessors = [autoprefixer(), cssnano(), cssmqpacker()];

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(changed(paths.styles.dest))
        .pipe(sass())
        .pipe(postcss(postcssProcessors))
        .pipe(gulp.dest(paths.styles.dest));
}

// --------------------------------------------------------------------------------------
// Javascript functions
// --------------------------------------------------------------------------------------

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(changed(paths.scripts.dest))
        .pipe(concat("main.js"))
        .pipe(terser())
        .pipe(gulp.dest(paths.scripts.dest));
}

// --------------------------------------------------------------------------------------
// Image functions
// --------------------------------------------------------------------------------------

// // set the image compression options
var imgOptions = [
    // .png
    pngquant({
        speed: 1,
        quality: [0.95, 1], //lossy settings
    }),
    zopfli({
        more: true,
        // iterations: 50 // very slow but more effective
    }),

    // .gif
    giflossy({
        optimizationLevel: 3,
        optimize: 3, //keep-empty: Preserve empty transparent frames
        lossy: 2,
    }),

    //svg
    imagemin.svgo({
        plugins: [
            {
                removeViewBox: false,
            },
        ],
    }),

    // .jpg
    mozjpeg({
        quality: 90,
        progressive: true,
    }),
];

// processing images
function images() {
    return gulp
        .src(paths.images.src)
        .pipe(changed(paths.images.dest))
        .pipe(
            cache(
                imagemin(imgOptions, {
                    verbose: true,
                })
            )
        )
        .pipe(gulp.dest(paths.images.dest));
}

// --------------------------------------------------------------------------------------
// Static files functions
// --------------------------------------------------------------------------------------

function static() {
    return gulp
        .src(paths.static.src, {
            dot: true,
        })
        .pipe(changed(paths.static.dest))
        .pipe(gulp.dest(paths.static.dest));
}

// --------------------------------------------------------------------------------------
// browser-sync functions
// --------------------------------------------------------------------------------------
const server = browserSync.create();

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: "dist",
        },
    });
    done();
}

// --------------------------------------------------------------------------------------
// Gulp functions/tasks
// --------------------------------------------------------------------------------------

// watch task
function watch() {
    gulp.watch(paths.styles.src, gulp.series(styles, reload));
    gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
    gulp.watch(paths.images.src, gulp.series(images, reload));
    gulp.watch(paths.static.src, gulp.series(static, reload));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts, images, static));

const dev = gulp.series(build, serve, watch);

exports.default = dev;
exports.dev = dev;
exports.build = build;
