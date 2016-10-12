main.controller('salesCtrl', function($rootScope, $scope, $http, $location, DBContacts, Headers) {

	$scope.app = $rootScope.config.app;
	$scope.api = $rootScope.config.api;
	$scope.labels = $rootScope.config.labels.sales;
	$scope.html = {
			modalheader : "",
			message : ""
	};
	$scope.routes = $rootScope.config.routing;
	
	$scope.sort = {
			type : 'position',
			reverse : false,
			showNI : false,
			searchString : ''
		};
	
	$scope.status = $rootScope.config.status;
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
					var y = $scope.data.all[i];
					$scope.data.all[i].empl_displayname = y.employee.firstname + " " + y.employee.lastname;
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
				
				init_getStatus();
				console.log($scope.data);
			});
		}
		
		
	};
	
	$scope.getFilter = function(){
		 switch ($scope.sort.type) {
         case 'company':
             return { company : $scope.sort.searchString};
         case 'position':
             return { position : $scope.sort.searchString};
         case 'empldisplayname' :
             return { empl_displayname : $scope.sort.searchString};
        
     }
	};
	
	$scope.showDetails = function(contact){
		
		var d = contact.employee
		
		$scope.data.modal = {
				name : d.firstname + " " + d.lastname,
				mail : d.email_employee,
				position : d.position,
				phone : d.phone,
				mobile : d.mobile ,
				picture : d.picture,
				email_contact : contact.email_contact
		}
		$('#modaldetails').openModal();
	};
	
	$scope.changeStatus = function (status){
		var put_data = {
				status : status,
				email_contact : $scope.data.modal.email_contact
		}
		
		var header = Headers;
		var host = $scope.app.url_back;
		var path = $scope.api.putSubmittedContactStatus;
		var config = {
			headers : header
		}
		
		console.log(put_data);
		
//		$http.put(host + path, put_data, config).then(function(respone){
//			console.log("passt");
//			$scope.initSales();
//		}, function(response){
//			console.log("passt nicht");
//		});
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
					openModal("Fehler", "");
				});
	};
	
	var init_createChart = function() {

		var s = $scope.status;
		var d = $scope.data.status;
		Chart.defaults.global.legend.position = "right";
		Chart.defaults.global.legend.fullWidth = true;
		Chart.defaults.global.responsive = false;
		var data = {
			labels : [ "" + s.NEW, "" + s.INTERESTING, "" + s.UNINTERESTING ],
			datasets : [ {
				data : [ d.NEW , d.INTERESTING, d.UNINTERESTING ],
				backgroundColor : [ "#FF6384", "#00EE00", "#12B7EB"],
				hoverBackgroundColor : [ "#FF6384", "#00EE00", "#12B7EB"]
			} ]
		};
		var ctx2 = document.getElementById("salesChart")
				.getContext("2d");
		var pieChartsales = new Chart(
				ctx2,
				{
					type : 'pie',
					data : data,
					options : {
						title : {
							text : "Verteilung der Kontakte nach Status",
							display : true,
							fontStyle : "bold",
							fontSize : 20
						}
					}
				});
	};

	var openModal = function(header, message) {
		$scope.html.modalheader = header;
		$scope.html.message = message;
			$('#modalinfo').openModal();
	};
	
	
// ==================== CONTROLLER FÜR LOGIN
	
	$scope.salesAuth = function(){
		console.log("hi")
		var path = $scope.api.dashboard_sales;
		$location.path(path);
	}
	
	

});
