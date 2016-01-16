app.controller('ProductCtrl', function($scope, product, ProductFactory) {

	$scope.product = product;
	console.log($scope.product);

	$scope.getPrice = ProductFactory.getPrice;

});