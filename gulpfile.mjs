import gulp from 'gulp';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import rename from 'gulp-rename';
import { deleteAsync } from 'del';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

const server = browserSync.create();

const paths = {
    html: './index.html',
    css: './css/**/*.css', // Шлях до ваших CSS-файлів
    js: './js/**/*.js',
    images: './images/**/*',
    fonts: './fonts/**/*',
    dist: './dist',
};

// Очищення папки dist
async function clean() {
    await deleteAsync([paths.dist]);
}

// Копіювання HTML
function html() {
    return gulp.src(paths.html, { allowEmpty: true })
        .pipe(gulp.dest(paths.dist))
        .pipe(server.stream());
}

// Обробка CSS
function styles() {
    return gulp.src(paths.css) // Використовуємо CSS, а не SCSS
        .pipe(autoprefixer()) // Додаємо автопрефікси
        .pipe(cleanCSS()) // Мінімізуємо CSS
        .pipe(rename({ suffix: '.min' })) // Додаємо суфікс .min
        .pipe(gulp.dest(`${paths.dist}/css`)) // Зберігаємо в dist/css
        .pipe(server.stream());
}

// Обробка JavaScript
function scripts() {
    return gulp.src(paths.js)
        .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(`${paths.dist}/js`))
        .pipe(server.stream());
}

// Оптимізація зображень
function images() {
    return gulp.src('./images/**/*') // Беремо всі файли з папки images
        .pipe(gulp.dest(`${paths.dist}/images`)); // Копіюємо в dist/images без оптимізації
}




// Копіювання шрифтів
function fonts() {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(`${paths.dist}/fonts`));
}

// Запуск сервера та відслідковування змін
function serve() {
    server.init({
        server: {
            baseDir: paths.dist,
        },
    });

    // Відслідковування змін
    gulp.watch(paths.html, html);
    gulp.watch(paths.css, styles); // Відслідковуємо зміни у CSS
    gulp.watch(paths.js, scripts);
    gulp.watch(paths.images, images);
}

// Основне завдання для зборки проекту
const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images, fonts));

// Завдання за замовчуванням (сервер)
const dev = gulp.series(build, serve);

export { clean, html, styles, scripts, images, fonts, build, serve };
export default dev;
