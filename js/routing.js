main.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl : 'views/login.html',
		controller : 'loginCtrl'
	})
	// LOGIN
	.when('/empl/login', {
		templateUrl : 'views/empl/empl_login.html'
	}).when('/sales/login', {
		templateUrl : 'views/sales/sales_login.html'
	}).when('/sales/dash', {
		templateUrl : 'views/sales/sales_dash.html'
	})

	.otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode(false);
});