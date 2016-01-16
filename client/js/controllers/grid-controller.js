app.controller('GridCtrl', function($scope, initialProducts, ProductFactory) {

	$scope.home = true;
	$scope.products = initialProducts;
	$scope.loadCount = ($scope.products.length - 12)/3;
	var nextLoadIndex = $scope.products.length;
	var jWindow = $(window); // for performance
	console.log($scope.products[0]);

	$scope.getPrice = ProductFactory.getPrice;


	// SCROLL LOADING FUNCTIONALITY

	// On button click, couple ajax call to scroll distance from bottom
	$scope.enableLoading = function() {
		if ($scope.loadCount > 3) return;
		// When user hits the button, load another row immediately
		if ($scope.loadCount === 0) {
			fetch(nextLoadIndex, nextLoadIndex+2);
		}
		$(document).on('scroll', function() {
			// We have only 12 more products to load, so only 4 more rows
			if ($scope.loadCount > 3) return;
			// If we're close to the bottom, load another row of products
			if (jWindow.scrollTop() + jWindow.height() > $(document).height() - 50) {
				fetch(nextLoadIndex, nextLoadIndex+2);
			}
		});
	}

	// Fetches additional products and appends them to $scope.products
	function fetch(startIndex, endIndex) {
		$scope.loadCount++;
		nextLoadIndex += 3;
		ProductFactory.fetchMoreProducts(startIndex, endIndex)
		.then(function(updatedProducts) {
			$scope.products = updatedProducts;
		});
	}

});