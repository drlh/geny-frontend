var main = angular.module('Main',
		[ 'Main', 'ngResource', 'ngRoute', 'ngTouch' ]);

main.run([ '$rootScope', '$http', 'Config', function($rootScope, $http, Config) {
	
	$rootScope.config = Config;
	
	
} ]);
