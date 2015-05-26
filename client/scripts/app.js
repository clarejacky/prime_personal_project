/**
 * Created by ClareJacky on 5/26/15.
 */
var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/admin', {
            templateUrl: "/views/routes/admin.html"
        }).
        when('/about', {
            templateUrl: "/views/routes/about.html"
        });
        //when('/projects', {
        //    templateUrl: "/views/routes/projects.html"
        //}).
        //otherwise({
        //    redirectTo: '/home'
        //});
}]);