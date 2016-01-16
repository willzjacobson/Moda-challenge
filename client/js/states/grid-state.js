app.config(function($stateProvider) {
	$stateProvider.state('grid', {
		url: '/',
		templateUrl: '/templates/grid.html',
		controller: 'GridCtrl',
		resolve: {
			initialProducts: function(ProductFactory) {
				return ProductFactory.fetchInitialProducts();
			}
		}
	});
});