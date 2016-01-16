app.factory('ProductFactory', function($http) {

	// Caching means no ajax necessary when returning to 'grid' state from 'product'
	var productsCache = [];

	var productMethods = {};

	// Need to do this so can easily nest ng-repeats in GridCtrl
	function groupByThree(arr) {
		var master = [];
		for (var i = 0; i < arr.length; i+=3) {
			master.push([arr[i], arr[i+1], arr[i+2]]);
		}
		var remains = arr.slice(arr.length-arr.length%3);
		if (remains.length) master.push(remains);
		console.log(master)
		return master;
	}

	// To render price
	productMethods.getPrice = function(product) {
		return $(product.price).html();
	}

	// Used in resolve of 'grid' state
	productMethods.fetchInitialProducts = function() {
		if (productsCache.length) return productsCache;
		return $http.post('/products', {start: 0, end: 11})
		.then(function(res) {
			productsCache = groupByThree(res.data.p);
			return productsCache;
		});
	}

	// Used on scroll events (same route as above, but handles cache differently)
	productMethods.fetchMoreProducts = function(startIndex, endIndex) {
		return $http.post('/products', {start: startIndex, end: endIndex})
		.then(function(res) {
			productsCache = productsCache.concat([res.data.p]);
			return productsCache;
		});
	}

	// Used in resolve for 'product' state
	productMethods.fetchOneProduct = function(productId) {
		return $http.get('/product/' + productId)
		.then(function(res) {
			return res.data.p[0];
		});
	}

	return productMethods;

});