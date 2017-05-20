var app = angular.module('myApp');
app.directive('retroHeader', function() {
  return {
    templateUrl: "templates/Header.html"
  }
});

app.directive('retroFooter', function() {
  return {
    templateUrl: "templates/Footer.html"
  }
});
app.directive('fcb', function() {
  return {
    templateUrl: "templates/fcb.html"
  }
});
