/**
 * Created by ClareJacky on 5/26/15.
 */
var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'appControllers', 'ngMap']);

var appControllers = angular.module('appControllers', []);

app.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider){

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
            templateUrl: "/views/routes/about.html",
            controller: "sendMessage"
        }).
        when('/submission', {
            templateUrl: "/views/routes/submission.html"
        }).
        when('/comingsoon', {
            templateUrl: "/views/routes/comingsoon.html"
        }).
        when('/locations', {
            templateUrl: "/views/routes/locations.html"
        }).
        when('/locationsFilter', {
            templateUrl: "/views/routes/locationsFilter.html"
        }).
        when('/location', {
            templateUrl: "/views/routes/location.html"
        }).
        when('/resources', {
            templateUrl: "/views/routes/resources.html",
            controller: "ResourcesController"
        }).
        when('/', {
            templateUrl: "/views/routes/home.html"
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
}]);

app.controller('LocationsController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.location ={};
    $scope.locations =[];

    //helper function to reroute to different page
    $scope.go = function ( path ) {
        $location.path( path );
    };
    //helper function to reload home
    $scope.reloadRoute = function() {
        $scope.go('/');
    };
    //function to fetch and load all locations from database
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
    //call fetchLocations to populate locations on page load
    fetchLocations();

    //click function to fetch locations
    //locationClick is on location template page, shows location information
    $scope.add = function(){
        $scope.locationClick = true;
        fetchLocations();
    };

    //set fitness type variable during filter function
    $scope.yoga = 'Yoga';
    $scope.pilates = 'Pilates';
    $scope.barre ='Barre';
    $scope.hiit = 'HIIT';
    $scope.crossfit ='Crossfit';
    $scope.general = 'General Fitness';

    //$scope.filter returns locations that fit with the matching fitnessType
    $scope.filter = function(fitnessType){
        $scope.locationClick = true;
        console.log(fitnessType);
        $http({
            url:'/locations/search',
            method: "GET",
            params: {fitnessType: fitnessType}
        }).then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            } else {
                $scope.location={};
                $scope.locations=response.data;
                console.log(response.data);
                if (response.data[0] == null) {
                    $scope.go('/comingsoon');
                }
            }
        })
    };
    //$scope.search returns location that fits searched name
    $scope.search = function(name){
        $scope.locationClick = true;
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

    //map coordinate variable
    $scope.el;

    //loads location with information and google map api
    $scope.searchLocation = function(name){
        $scope.locationClick = true;
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
            $scope.website = "http://"+response.data[0].website;
            console.log($scope.website);
            console.log(response.data[0].coordinates);
            $scope.el = response.data[0].coordinates;
            console.log($scope.el);
            $scope.locationClick = true;
            $scope.locationMap = true;
            if(response.data[0].coordinates == undefined){
                console.log("empty")
                $scope.locationMap = false;
            }

        }).then(function(){
            $scope.go('/location');
        })

    };

    //brings you to locations page if there isn't a location to populate location page
    $scope.locationPage = function(){
        $scope.go('/locations');
    };


    //shows input box on admin page
    $scope.showInput = function() {
        $scope.show = true;
    };

    //sends admin back to root page
    $scope.logOut = function(){
        console.log("successful logout");
        window.location.href="/";
            //clear session, with express-session or check window cookies
    };

}]);
