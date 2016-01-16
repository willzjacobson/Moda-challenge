app.config(function($stateProvider) {
	$stateProvider.state('product', {
		url: '/product/:productId',
		templateUrl: '/templates/product.html',
		controller: 'ProductCtrl',
		resolve: {
			product: function(ProductFactory, $stateParams) {
				return ProductFactory.fetchOneProduct($stateParams.productId);
			}
		}
	});
});