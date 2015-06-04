app.controller('sendMessage', ["$scope", "$http", '$location', function($scope, $http, $location){
    $scope.mail = {};

    $scope.go = function ( path ) {
        $location.path( path );
    };

    $scope.mailer = function(mailContent) {
        $http.post('/mail/sendMail', mailContent).
            success(function(data) {
                console.log(data);
                $scope.go('/submission');
            });
    }

}]);