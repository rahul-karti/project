var app = angular.module("myApp", ["ngRoute", "LocalStorageModule", "ngMessages"]);
app.config(['$locationProvider', 'localStorageServiceProvider', function($locationProvider, localStorageServiceProvider) {
  $locationProvider.hashPrefix('');
  localStorageServiceProvider.setPrefix('FGA');
}]);
app.controller("MyController", ["$scope", "$http", "localStorageService", function($scope, $http, localStorageService) {
  var productsUrl = "json/products.json";
  $http.get(productsUrl).then(function(response) {
    $scope.productsDetails = response.data;
  });

  //add to cart
  $scope.addToCart = function(product) {
    $scope.cart = localStorageService.get("Cart") || [];
    var alreadyInCart = false;
    angular.forEach($scope.cart, function(item) {
      if (item.productID === product.PID) {
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      var productDetails = {
        name: product.heading,
        image: product.image,
        productID: product.PID,
        price: product.price,
        total: product.totalPrice,
        quantity: product.quantity
      };
      $scope.cart.push(productDetails);
      localStorageService.set("Cart", $scope.cart);
      localStorageService.set("Cart Quantity", $scope.cart.length);
      $.snackbar({
        content: "Product Added Successfully!",
        style: "toast",
        timeout: 3000
      });
    } else {
      $.snackbar({
        content: "Product Is Already In Cart!",
        style: "toast",
        timeout: 5000
      });
    }
  };
  $scope.cart = localStorageService.get("Cart");
  $scope.getCartLength = function() {
    return localStorageService.get("Cart Quantity");
  }
  //Get cart total price
  $scope.getCartPrice = function() {
    var total = 0;
    angular.forEach($scope.cart, function(product) {
      total += product.price * product.quantity;
    });
    localStorageService.set("Grand Total", total);
    return total;
  };
  /*clear cart*/
  $scope.clearCart = function() {
    $scope.cart = [];
    return localStorageService.clearAll("Cart");
    return localStorageService.clearAll("Cart Quantity");
  };
  //increase qty in cart
  $scope.incQty = function(id, qty) {
    localStorageService.get("Cart");
    if (qty < 10 && qty >= 1) {
      angular.forEach($scope.cart, function(product) {
        if (product.productID === id) {
          product.quantity++;
        }
      });
    }
    localStorageService.set("Cart", $scope.cart);
  };
  //decrease qty in cart
  $scope.decQty = function(id, qty) {
    localStorageService.get("Cart");
    if (qty <= 10 && qty > 1) {
      angular.forEach($scope.cart, function(product) {
        if (product.productID === id) {
          product.quantity--;
        }
      });
    }
    localStorageService.set("Cart", $scope.cart);
  };
  /*Delete item from the cart*/
  $scope.deleteItem = function(id) {
    localStorageService.get("Cart");
    localStorageService.get("Cart Quantity");
    for (var i = 0; i < $scope.cart.length; i++) {
      if ($scope.cart[i].productID === id) {
        $scope.cart.splice(i, 1);
        localStorageService.set("Cart Quantity", $scope.cart.length);
      }
    }
    localStorageService.set("Cart", $scope.cart);
  };

  $scope.goToCart = function() {
    window.location.href = "#/cart"
  };

  $scope.updateCartPrice = function() {
    window.location.href = "#/customerDetails"
    var uCart = localStorageService.get("Cart");
    angular.forEach(uCart, function(product) {
      product.totalPrice = product.price * product.quantity;
    });
    localStorageService.set("Cart", uCart);
  };
  $scope.customerDetails = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };
  var productName;
  var quantity;
  var price;
  var totalPrice;
  $scope.cdForm = function() {
    angular.forEach(localStorageService.get("Cart"), function(item) {
      productName = item.name;
      quantity = item.quantity;
      price = item.price;
      totalPrice = item.totalPrice;
    });
    emailjs.send("gmail", "customer_details", {
      "productName": productName,
      "quantity": quantity,
      "price": price,
      "totalPrice": totalPrice,
      "name": $scope.customerDetails.name,
      "phone": $scope.customerDetails.phone,
      "address": $scope.customerDetails.address,
      "email": $scope.customerDetails.email
    }).then(function(response) {
      $scope.clearCart();
      $.snackbar({
        content: "Your order is placed successfully! The product will be delivered soon...",
        style: "toast",
        timeout: 3000
      });
    });
    $scope.customerDetails = {};
    $scope.customerDetailsForm.$setUntouched();
  }

  /*contact*/
  $scope.contact = {
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  }
  $scope.contactFormSubmit = function() {
    emailjs.send("gmail", "contact_form_rahul", {
      "name": $scope.contact.name,
      "email": $scope.contact.email,
      "phone": $scope.contact.phone,
      "address": $scope.contact.address,
      "msg": $scope.contact.message
    }).then(function(response) {
      $.snackbar({
        content: "Your Request Has Been Submitted!",
        style: "toast",
        timeout: 3000
      });
    });
    $scope.contact = {};
    $scope.contactForm.$setUntouched();
  }
}]);
