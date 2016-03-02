// add controllers
var app = angular.module('myApp')
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common['Access-Control-Allow-Origin','*'];
        }
    ]);


  app.controller('ohlcCtrl', function($scope, $http){
  $http({
    method: "GET",
    type: "JSON",
    url: "/ohlc"
    }).success(function(data){
      $scope.ohlc = data;
    })
});

  //Use the above http request to call backend.  The backend route should res.json the data
  //from teh api ca
