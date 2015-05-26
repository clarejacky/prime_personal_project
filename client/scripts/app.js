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

app.controller('LocationsController', ['$scope', '$http', function($scope, $http){
    $scope.location ={};
    $scope.locations =[];

    var fetchLocations = function(){
        console.log("click worked");
        return $http.get('/locations').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            }
            $scope.location={};
            $scope.locations=response.data;
            return response.data;
        })
    };

    $scope.add = function(){
        fetchLocations();
    }
}]);