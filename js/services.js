main.factory('Auth', function($resource, $rootScope) {
	// var r = $resource('https://h2540124.stratoserver.net:4000/api/auth', {},
	// {
	var r = $resource('https://'+$rootScope.host+':4000/api/auth', {}, {
		'post' : {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			}
		}
	});
	return r;
	// localhost:3000/api/auth
	// h2540124.stratoserver.net:3000/api/auth
});

main.factory('Logout', function($resource, $rootScope) {
	var r = $resource('https://'+$rootScope.host+':4000/api/logout', {},
			{
				'get' : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			});
	return r;
});

main.factory('Missions', function($resource, $rootScope) {
	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource('https://'+$rootScope.host+':4000/api/missions', {}, {
		'get' : {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		},
		'update' : {
			method : 'PUT',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		}
	});
	return r;
});

main.factory('UserMissions', function($resource, $rootScope) {
	var usr = JSON.parse(localStorage.getItem("user"));
	var token = localStorage.getItem("token");
	var r = $resource('https://'+$rootScope.host+':4000/api/users/' + usr.user_id
			+ '/missions', {}, {
		'get' : {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : JSON.stringify(usr),
				'x-access-token' : token
			}
		}
	});
	return r;
});

main.factory('MissionsAdd', function($resource, $rootScope) {
	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource('https://'+$rootScope.host+':4000/api/missions', {}, {
		'post' : {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		}
	});
	return r;
});

main.factory('MissionsDetail', function($resource, $rootScope) {
	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource('https://'+$rootScope.host+':4000/api/missions', {}, {
		'get' : {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		},
		'update' : {
			method : 'PUT',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		}
	});
	return r;
});

main.factory('Customers', function($resource, $rootScope) {
	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource('https://'+$rootScope.host+':4000/api/customers', {}, {
		'get' : {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		}
	});
	return r;
});

main.factory('Contacts', function($resource, $rootScope) {
	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource('https://'+$rootScope.host+':4000/api/contacts', {}, {
		'get' : {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		}
	});

	return r;
});

main.factory('Employees', function($resource, $rootScope) {
	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource('https://'+$rootScope.host+':4000/api/users', {}, {
		'get' : {
			method : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'locals' : usr,
				'x-access-token' : token
			}
		}
	});
	return r;
});

/**
 * Gibt die Config für den header einer Anfrage zurück
 */
main.factory('Headers', function() {
	var data = {
		'Content-Type' : 'application/json',
		'locals' : JSON.parse(JSON.stringify(localStorage.getItem("user"))),
		'x-access-token' : localStorage.getItem("token")
	};

	return data;
});

main.factory('MissionEEdit', function($resource, $rootScope) {

	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource(
			'https://'+$rootScope.host+':4000/api/missions/:mission_id/availUsers', {}, {
				'get' : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json',
						'locals' : usr,
						'x-access-token' : token
					}
				}
			});
	return r;
});

main.factory('MissionCEdit', function($resource, $rootScope) {

	var usr = JSON.parse(JSON.stringify(localStorage.getItem("user")));
	var token = localStorage.getItem("token");
	var r = $resource(
			'https://'+$rootScope.host+':4000/api/missions/:mission_id/availContacts',
			{}, {
				'get' : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json',
						'locals' : usr,
						'x-access-token' : token
					}
				}
			});
	return r;
});