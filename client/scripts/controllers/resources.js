app.controller('ResourcesController', ['$scope', '$http', '$location', function($scope, $http, $location) {


    var apikey = 'AIzaSyBVJJUB5vwtCNHdzPdoiQtjpZwaqAVaIXw';
    var query = 'yoga';

   var youtube = function(query){
        console.log(query);
        $http({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + query + '&type=video&videoCaption=closedCaption&start-index=1&maxResults=10&orderby=published&key=' + apikey + '',
            method: "GET"
        }).then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to fetch locations from the API');
            } else {
                console.log(response);
                }
            })
    };
    youtube();

}]);