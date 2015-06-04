app.controller('sendMessage', ["$scope", "$http", function($scope, $http){
    $scope.mail = {};

    $scope.mailer = function(mailContent) {
        $http.post('/mail/sendMail', mailContent).
            success(function(data) {
                console.log(data);
            });
    }

}]);