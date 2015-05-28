

app.controller('RegistrationController',['$scope','$http', '$location',  function($scope, $http, $location){
    console.log("Controller iz loaded");

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.adminSubmit = function(admin){
        console.log(admin);
        $http.post('/admin', admin).then(function(response){
            if(response.status === 200){
                console.log("this did something");
                $scope.go('/input');
            }
        })

    }


}]);