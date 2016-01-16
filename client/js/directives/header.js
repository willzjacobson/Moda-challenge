app.directive('header', function() {
	return {
		restrict: 'E',
		scope: {
			home: '='
		},
		templateUrl: '/templates/header.html'
	}
});