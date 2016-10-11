main.controller('salesCtrl', function($rootScope, $scope, $location, DBContacts) {

	$scope.app = $rootScope.config.app;
	$scope.labels = $rootScope.config.labels.sales;
	$scope.html = {
			modalheader : "",
			message : ""
	};
	$scope.routes = $rootScope.config.routing;
	
	$scope.sort = {
			type : 'company',
			reverse : false,
			searchString : ''
		};
	
	$scope.data = {
			all : [],
			pool : [],
			lead : [],
			unin : []
		};
	
	$scope.initSales = function() {
		
		var data = new DBContacts();
		if (data != null) {
			data.$get(function(data) {
				
				console.log(data);
				$scope.data.all = data.contacts;

				for (var i = 0; i < $scope.data.all.length; i++) {
					var x = $scope.data.all[i];
					if (x.status == "NEW") {
						$scope.data.pool.push(x);
					}
					if (x.status == "INTERESTING") {
						$scope.data.lead.push(x);
					}
					if (x.status == "UNINTERESTING") {
						$scope.data.unin.push(x);
					}
				}
				console.log($scope.data);
			});
		}
		
		
	};
	
	var init_getStatus = function() {
		var header = Headers;
		var host = $scope.app.url_back;
		var path_get = $scope.api.getSubmittedContactsStatus;
		var config = {
			headers : header
		}


		$http.get(host + path_get).then(
				function(response) {
					$scope.data.status = response.data.result;
					console.log($scope.data.status);
					init_createChart();
				}, function(response) {
					openModal("Fehler", response.data.message);
				});
		
	};
	
	$scope.showDetailsPool = function(data) {
		$scope.html.modalheader = "Verknüpfung";
		$scope.html.message = "m1";
			$('#modalinfo').openModal();
	};
	
	

});
