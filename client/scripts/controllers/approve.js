

app.controller('RegistrationController',['$scope','$http', '$location',  function($scope, $http, $location){
    console.log("Controller iz loaded");

    $scope.go = function ( path ) {
        $location.path( path );
    };

    app.config(['$httpProvider', '$q', function($httpProvider){
        $httpProvider.interceptors.push(function($q) {
            return {
                response: function(response) {
                    // do something on success
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401)
                        $$scope.go('/adminPage');
                    return $q.reject(response);
                }
            };
        });
    }]);

    $scope.adminSubmit = function(admin){
        console.log(admin);
            return $http.post('/admin', admin).then(function(){
                if(response){
                    $scope.go('/input');
                }
        })

    }


}]);