app.controller('GridCtrl', function($scope, initialProducts, ProductFactory) {

	$scope.home = true; // for header directive
	$scope.products = initialProducts;
	console.log(initialProducts)
	// keeping track of which product id's to query next
	$scope.loadCount = $scope.products.length - 4;
	var nextLoadIndex = $scope.products.length * 3;
	var jWindow = $(window); // for performance

	$scope.getPrice = ProductFactory.getPrice;
	$scope.it = function(product) {
		console.log(product)
	}



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