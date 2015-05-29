

app.controller('RegistrationController',['$scope','$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
    console.log("Controller iz loaded");
    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.adminSubmit = function(admin){
        console.log(admin);
        $http.post('/admin', admin).then(function(response){
            if(response.status === 200){
               $scope.go('/input');
            }
        })

    };

    $scope.locationSubmit = function(location){
        $http.post('/locations', location).then(function(response){
            if(response.status === 200){
                $scope.go('/locations');
            }
        })
    };


}]);