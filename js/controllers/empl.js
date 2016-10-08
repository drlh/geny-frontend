main.controller('emplCtrl', function($rootScope, $scope, $location, Employee, Contacts) {

	$scope.labels = {};
	$scope.data = {};
	$scope.agreement = false;
	$scope.disabled = "disabled";

	$scope.initEmpl = function() {

		var data = new Employee();
		if (data != null) {
			data.$get(function(result) {
				console.log(result.data);

				localStorage.setItem('employee', JSON
						.stringify(result.data));
				
				createData(result.data);
				
				var contacts = new Contacts();
				if (contacts != null) {
					contacts.$get(function(result2) {
						
						console.log(result2.data);
						
						$scope.data.ui.total_contacts = result2.data.contacts.total;
						
						localStorage.setItem('contacts', JSON
								.stringify(result2.data));
					});
				}
				
			});
		}

	};

	var createData = function(d) {
		

		$scope.data = {
			employee : d,
			ui : {
				display_name : d.display_name,
				first_name : d.first_name,
				last_name : d.last_name,
				permalink : d.permalink,
				active_email : d.active_email,
				title : d.professional_experience.companies["0"].title,
				picture : d.photo_urls.size_256x256,
				phone : ('+'+d.business_address.phone).replace(/\|/g, ' '),
				mobile : ('+'+d.business_address.mobile_phone).replace(/\|/g, ' '),
				birthday : d.birth_date.day + '.' + d.birth_date.month + '.' + d.birth_date.year,
				submitted_contacts : 0
			}
		}
		$scope.labels = $rootScope.config.labels.empl;
		console.log($scope.data);
		console.log($scope.labels);
	};

});
