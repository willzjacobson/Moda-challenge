window.app = angular.module('FakeApp', ['ui.router', 'ngModal']);

app.config(function($urlRouterProvider) {
	// If no specified url or url that doesn't exist, go to grid state
	$urlRouterProvider.otherwise('/');
})