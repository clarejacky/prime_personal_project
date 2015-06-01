/**
 * Created by ClareJacky on 5/26/15.
 */
var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'appControllers', 'ngMap']);

var appControllers = angular.module('appControllers', []);

//app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

app.config(['$routeProvider','$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider){

    $routeProvider.
        when('/adminPage', {
            templateUrl: "/views/routes/admin.html",
            controller: 'RegistrationController'
        }).
        when('/input', {
            templateUrl: "/views/routes/input.html",
            controller: 'RegistrationController'
        }).
        when('/about', {
            templateUrl: "/views/routes/about.html"
        }).
        when('/locations', {
            templateUrl: "/views/routes/locations.html"
        }).
        when('/location', {
            templateUrl: "/views/routes/location.html"
        }).
        otherwise({
            redirectTo: '/'
        });


    $httpProvider.interceptors.push(['$location', '$q', function($location, $q) {
        return {
            response: function(response) {
                console.log(response);
                if (response.status === 200){
                    console.log("we made it inside of here");
                    return response;
                }

                //return response;
            },
            responseError: function(response) {
                console.log("404 error");
                if (response.status === 401) {
                    alert("Incorrect Username or Password")
                    //$location.url('/adminPage');
                    return $q.reject(response);
                }
            }
        };
    }]);
    // alternatively, register the interceptor via an anonymous factory
}]);


app.controller('LocationsController', ['$scope', '$http', '$location', function($scope, $http, $location){
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
            console.log(response.data);
            return response.data;
        })
    };

    $scope.add = function(){
        $scope.image = true;
        fetchLocations();
    }

    $scope.yoga = 'Yoga';
    $scope.pilates = 'Pilates';
    $scope.barre ='Barre';
    $scope.hiit = 'HIIT';
    $scope.crossfit ='Crossfit';
    $scope.general = 'General Fitness';
    $scope.filter = function(fitnessType){
        $scope.image = true;
        console.log(fitnessType);
        $http({
            url:'/locations/search',
            method: "GET",
            params: {fitnessType: fitnessType}
        }).then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            }
            $scope.location={};
            $scope.locations=response.data;
            console.log(response.data);
            return response.data;
        })
    };

    $scope.search = function(name){
        $scope.image = true;
        $location.url('/locations');
        console.log(name);
        $http({
            url:'/locations/search',
            method: "GET",
            params: {name: name}
        }).then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            }
            $scope.location={};
            $scope.locations=response.data;
            console.log(response.data);
            return response.data;
        })
    };

    $scope.searchLocation = function(name){
        $scope.image = true;
        console.log(name);
        $http({
            url:'/locations/search',
            method: "GET",
            params: {name: name}
        }).then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            }
            $scope.location={};
            $scope.locations=response.data;
            console.log(response.data);
            return response.data;
        })
    };

    $scope.mapCenter = [40.74, -74.18];
    $scope.markerCenter = [40.74, -74.18];


}]);