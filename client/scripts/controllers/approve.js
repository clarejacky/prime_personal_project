

app.controller('RegistrationController',['$scope','$http', function($scope, $http){
    console.log("Controller iz loaded");
    $scope.adminSubmit = function(admin){
        console.log(admin);
            return $http.post('/').then(function(response){
                if(response.status !== 200){
                    throw new Error('Failed to fetch locations from the API');
                }
        })
    }
}]);