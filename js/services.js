main.factory('Config', function($timeout, $http) {

	var data = null;
	jQuery.ajax({
		url : '/config.json',
		success : function(result) {
			data = result;
		},
		error : function() {
			console.log("error");
		},
		async : false
	});
	return data;
});

main.factory('Employee', function($resource, $rootScope) {
	var url = $rootScope.config.app.url_back;
	var api = $rootScope.config.api;
	
	var r = $resource(url + api.getEmployeeDetails,
			{}, {
				'get' : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			});
	return r;
});

main.factory('ContactIds', function($resource, $rootScope) {
	var url = $rootScope.config.app.url_back;
	var api = $rootScope.config.api;
	
	var r = $resource(url + api.getContactIds,
			{}, {
				'get' : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			});
	return r;
});

main.factory('Contacts', function($resource, $rootScope) {
	var url = $rootScope.config.app.url_back;
	var api = $rootScope.config.api;
	
	var r = $resource(url + api.getContacts,
			{}, {
				'get' : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			});
	return r;
});

main.factory('DBContacts', function($resource, $rootScope) {
	var url = $rootScope.config.app.url_back;
	var api = $rootScope.config.api;
	
	var r = $resource(url + api.getSubmittedContacts,
			{}, {
				'get' : {
					method : 'GET',
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			});
	return r;
});

main.factory('Headers', function() {
	var data = {
		'Content-Type' : 'application/json'
	};

	return data;
});