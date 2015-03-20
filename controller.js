var boggle = angular.module('boggle', []);

boggle.controller('PhoneListCtrl', function ($scope, $http) {  
    var surroundingCells = [];
    var cellsClicked = [];
    var currentWord = "";
    
    $http.jsonp('http://h2267956.stratoserver.net:8082/api/boggle/getbogglebox?callback=JSON_CALLBACK').
    success(function(data) {
      console.log(data);
      $scope.id = data.boggleBoxID;
      $scope.list = data.dies;
    }).
    error(function(data, status, headers, config) {
      alert(status);
    });
    
    $scope.cellClick = function(index, letter) {
        if (cellsClicked.indexOf(index) == -1 && surroundingCells.indexOf(index) != -1 || surroundingCells.length == 0) {
            currentWord += letter;
            cellsClicked.push(index);
            surroundingCells = [(index + 1), (index + 3), (index + 4), (index + 5), (index - 1), (index - 3), (index - 4), (index - 5)];            
            var td = document.getElementById("cell" + index).style.background = "yellow";
         }
         $scope.currentWord = currentWord;
    }
    $scope.addWord = function(){
        $http.jsonp('http://h2267956.stratoserver.net:8082/api/boggle/isvalidword?boggleBoxId='+ $scope.id + '&word=' + currentWord + '&callback=JSON_CALLBACK').
        success(function(data) {
          alert(data);
        }).
        error(function(data, status, headers, config) {
          alert("ZEER ZWWAAAAAR KUT");
        });
    }
});