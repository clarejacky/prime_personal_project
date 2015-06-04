app.controller('ResourcesController', ['$scope', '$http', '$location', '$sce', function($scope, $http, $location, $sce) {


    var apikey = 'AIzaSyBVJJUB5vwtCNHdzPdoiQtjpZwaqAVaIXw';
    $scope.query  = 'body positive yoga';

   var youtube = function(){
        console.log($scope.query);
        $http({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + $scope.query + '&type=video&videoCaption=closedCaption&start-index=1&maxResults=10&orderby=published&key=' + apikey + '',
            method: "GET"
        }).then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            } else {
                //$scope.youtube = response.data.items[0].id.videoId;
                console.log(response.data.items[0].id.videoId);
                $scope.youtube = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+ response.data.items[0].id.videoId);
                console.log($scope.youtube);
                }
            })
    };
    youtube();

    var fetchInspiration = function (){
        return $http.get('/resource').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            }
            $scope.inspiration={};
            $scope.inspirations=response.data;
            console.log(response.data);
            return response.data;
        })
    }


    $scope.inspire = function (inspiration){
        $http.post('/resource', inspiration).then(function(response){
            if(response.status === 200){
               console.log(response);
                fetchInspiration();
                $scope.inspireme = true;

            }
        });
    }



}]);