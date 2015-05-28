

app.controller('RegistrationController',['$scope','$http', '$location',  function($scope, $http, $location){
    console.log("Controller iz loaded");

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.adminSubmit = function(admin){
        console.log(admin);
            return $http.post('/admin', admin);
    }


}]);