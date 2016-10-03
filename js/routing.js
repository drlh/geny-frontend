main.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl : 'index.html',
		resolve : {
			"check" : function($location) {
				if (window.localStorage['token'] == null) {
					$location.path('/');
				} else
					$location.path('/termine');
			}
		},
		controller : 'loginController'
	})
	// TERMINE
	
	.otherwise({
		redirectTo : '/'
	});

	$locationProvider.html5Mode(false);
});