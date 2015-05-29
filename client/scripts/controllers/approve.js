

app.controller('RegistrationController',['$scope','$http', '$location', function($scope, $http, $location){
    console.log("Controller iz loaded");
    $scope.go = function ( path ) {
        $location.path( path );
    };


    $scope.adminSubmit = function(admin){
        console.log(admin);
       $scope.go('/input');


    };

    $scope.locationSubmit = function(location){
            $http.post('/locations', location).then(function(response){
                if(response.status === 200){
                    $scope.go('/locations');
                }
            });
        }




}]);