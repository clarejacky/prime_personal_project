module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'client/scripts/controllers/approve.js',
                dest: 'public/javascripts/approve.min.js'
            },
            buildFile: {
                src: 'client/scripts/app.js',
                dest: 'public/javascripts/app.min.js'
            },
            buildAgain: {
                src: 'client/scripts/controllers/page.js',
                dest: 'public/javascripts/page.min.js'
            }
        },
        copy: {
            angular: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular/angular.min.js.map",
                    "angular/angular-csp.css"
                ],
                "dest": "public/vendor/"
            },
            angularResource: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular-resource/angular-resource.min.js",
                    "angular-resource/angular-resource.min.js.map"
                ],
                "dest": "public/vendor/"
            },
            angularGooglemaps: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "ngmap/build/scripts/ng-map.min.js"
                ],
                "dest": "public/vendor/"
            },
            angularSanitize: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular-sanitize/angular-sanitize.min.js",
                    "angular-sanitize/angular-sanitize.min.js.map"
                ],
                "dest": "public/vendor/"
            },
            angularRoute: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular-route/angular-route.min.js",
                    "angular-route/angular-route.min.js.map"
                ],
                "dest": "public/vendor/"
            },
            angularBootstrap: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular-bootstrap/dist/ui-bootstrap.min.js",
                    "angular-bootstrap/dist/ui-bootstrap-tpls.min.js"
                ],
                "dest": "public/vendor/"
            },
            bootstrap: {
                expand: true,
                cwd: "node_modules",
                src: [
                    "bootstrap/dist/css/bootstrap.css",
                    "bootstrap/dist/css/bootstrap.css.map",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
                    "bootstrap/dist/fonts/glyphicons-halflings-regular.woff2",
                    "bootstrap/dist/js/bootstrap.min.js"
                ],
                "dest": "public/vendor/"
            },
            jQuery: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map"
                ],
                "dest": "public/vendor/"
            },
            styles: {
                expand: true,
                cwd: "client",
                src: [
                    "stylesheets/style.css"
                ],
                "dest": "public/"
            },
            views: {
                expand: true,
                cwd: "client/views/",
                src: [
                    "location.html",
                    "locations.html",
                    "admin.html",
                    "about.html",
                    "input.html",
                    "home.html",
                    "comingsoon.html"
                ],
                "dest": "public/views/routes/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify']);

};