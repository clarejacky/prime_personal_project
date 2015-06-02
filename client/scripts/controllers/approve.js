

app.controller('RegistrationController',['$scope','$http', '$location', function($scope, $http, $location){
    console.log("Controller iz loaded");
    $scope.go = function ( path ) {
        $location.path( path );
    };


    $scope.adminSubmit = function(admin){
        $http.post('/admin', admin).then(function(response){
            console.log(response);
        })
    };

    $scope.locationSubmit = function(location){
        $scope.image = true;

        $http.post('/locations', location).then(function(response){
                if(response.status === 200){
                    $scope.go('/locations');
                }
            });
        }




}]);