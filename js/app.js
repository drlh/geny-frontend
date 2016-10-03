var main = angular.module('Main',
		[ 'Main', 'ngResource', 'ngRoute', 'ngTouch' ]);

main.run([ '$rootScope', function($rootScope) {

	// FILTER
	$rootScope.filterMissions = false; /*
										 * Filter die Selektion der Missionen
										 * nach User oder allen true= alle
										 * Missionen
										 */
	$rootScope.host = location.hostname;
	// $rootScope.host = 'localhost';
	$rootScope.userHash = {};

	// AUTH
	var rights = {
		admin : false,
		clerk : false
	}

	$rootScope.isAdmin = function() {
		rights.admin = true;
		rights.clerk = true;
		localStorage.setItem('userRights', JSON.stringify(rights));

	}
	$rootScope.getAdmin = function() {
		var r = JSON.parse(localStorage.getItem('userRights'));
		if (r == null) {
			return false;
		} else {
			return r.admin;
		}
	}

	$rootScope.isClerk = function() {
		rights.clerk = true;
		localStorage.setItem('userRights', JSON.stringify(rights));
	}
	$rootScope.getClerk = function() {
		var r = JSON.parse(localStorage.getItem('userRights'));
		if (r == null) {
			return false;
		} else {
			return r.clerk;
		}
	}

	$rootScope.createUserHash = function() {

	}
} ]);