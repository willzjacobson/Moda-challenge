app.factory('ProductFactory', function($http) {

	// Caching means no ajax necessary when returning to 'grid' state from 'product'
	var productsCache = [];

	var productMethods = {};

	// To render price
	productMethods.getPrice = function(product) {
		return $(product.price).html();
	}

	// Used in resolve of 'grid' state
	productMethods.fetchInitialProducts = function() {
		if (productsCache.length) return productsCache;
		return $http.post('/products', {start: 0, end: 11})
		.then(function(res) {
			productsCache = res.data.p;
			return productsCache;
		});
	}

	// Used on scroll events (same route as above, but handles cache differently)
	productMethods.fetchMoreProducts = function(startIndex, endIndex) {
		return $http.post('/products', {start: startIndex, end: endIndex})
		.then(function(res) {
			productsCache = productsCache.concat(res.data.p);
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