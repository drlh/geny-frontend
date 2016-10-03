main.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl : 'views/login.html',
		controller : 'loginCtrl'
	})
	// LOGIN
	.when('/emp/login', {
		templateUrl : 'views/emp/login.html'
	}).when('/sales/login', {
		templateUrl : 'views/sales/login.html'
	})

	.otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode(true);
});