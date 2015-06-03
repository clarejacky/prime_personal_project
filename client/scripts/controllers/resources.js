app.controller('ResourcesController', ['$scope', '$http', '$location', '$sce', function($scope, $http, $location, $sce) {


    var apikey = 'AIzaSyBVJJUB5vwtCNHdzPdoiQtjpZwaqAVaIXw';
    var query  = 'feminism';

   var youtube = function(query){
        console.log(query);
        $http({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + 'bodypositiveyoga' + '&type=video&videoCaption=closedCaption&start-index=1&maxResults=10&orderby=published&key=' + apikey + '',
            method: "GET"
        }).then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            } else {
                //$scope.youtube = response.data.items[0].id.videoId;
                console.log(response.data.items[0].id.videoId);
                $scope.youtube = $sce.trustAsResourceUrl("http://www.youtube.com/embed/"+ response.data.items[0].id.videoId);
                console.log($scope.youtube);
                }
            })
    };
    youtube();

}]);