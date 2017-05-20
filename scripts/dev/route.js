angular.module('myApp').config(function($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl : "templates/Home.html",
        controller: "MyController"
    })
    .when("/about", {
        templateUrl : "templates/About.html",
        controller: "MyController"
    })
    .when("/products", {
        templateUrl : "templates/Product.html",
        controller: "MyController"
    })
    .when("/products/:PID", {
        templateUrl : "templates/SinglePage.html",
        controller: "MyController"
    })
    .when("/contact", {
        templateUrl : "templates/Contact.html",
        controller: "MyController"
    })
    .when("/cart", {
        templateUrl : "templates/Cart.html",
        controller: "MyController"
    })
    .when("/wip", {
        templateUrl : "templates/wip.html",
        controller: "MyController"
    })
    .when("/customerDetails", {
        templateUrl : "templates/customerDetails.html",
        controller: "MyController"
    })
    .otherwise({
			redirectTo: '/home'
		});
  });
