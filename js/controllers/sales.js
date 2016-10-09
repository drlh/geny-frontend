main.controller('salesCtrl', function($rootScope, $scope, $location, DBContacts) {

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
			sale : []
		};
	$scope.initSales = function() {

		$scope.labels = $rootScope.config.labels.sales;
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
					if (x.status == "INTERESTING" || x.status == "CONTACTED" || x.status == "INTERESTED" ) {
						$scope.data.lead.push(x);
					}
					if (x.status == "NEGOTIATION"  || x.status == "DEAL") {
						$scope.data.sale.push(x);
					}
				}
				console.log($scope.data);
			});
		}
		
		
	};
	
	$scope.showDetailsPool = function(data) {
		$scope.html.modalheader = "modalpool";
		$scope.html.message = "m1";
			$('#modalpool').openModal();
	};
	
	$scope.showDetailsOpportunity = function(data) {
		$scope.html.modalheader = "modalopportunity";
		$scope.html.message = "m1";
			$('#modalopportunity').openModal();
	};
	
	$scope.showDetailsSale = function(data) {
		$scope.html.modalheader = "modalsale";
		$scope.html.message = "m1";
			$('#modalsale').openModal();
	};

});
