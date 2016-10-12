main
		.controller(
				'emplCtrl',
				function($rootScope, $http, $scope, $location, Employee,
						Contacts, Headers) {

					$scope.labels = $rootScope.config.labels.empl;
					$scope.app = $rootScope.config.app;
					$scope.api = $rootScope.config.api;
					$scope.routes = $rootScope.config.routing;
					
					$scope.status = $rootScope.config.status;
					$scope.data = {};
					$scope.agreement = false;
					$scope.revoke = false;
					$scope.disabled = "disabled";
					$scope.html = {
						header : "",
						message : ""
					}

					$scope.initEmpl = function() {

						var data = new Employee();
						if (data != null) {
							data
									.$get(function(result) {

										localStorage.setItem('employee', JSON
												.stringify(result.data));

										init_compositeData(result.data);
										init_addEmployee();
										init_getStatus();
										

										var contacts = new Contacts();
										if (contacts != null) {
											contacts
													.$get(function(result2) {

														$scope.data.ui.total_contacts = result2.data.contacts.total; // Total_contacts
														$scope.data.contacts = result2.data.contacts.users;
														localStorage.setItem('contacts',JSON.stringify(result2.data));
													});
										}
									});
						}
					};
					
					$scope.deleteContacts = function() {
						
						var header = Headers;
						var host = $scope.app.url_back;
						var path = $scope.api.deleteContacts;
						var config = {
							headers : header
						}
						
						$http.delete( host + path + '/'+ $scope.data.ui.active_email ,{}, config).then(
								function(response) {
									console.log(response);
									openModal("Erfolg", response.data.message);
									init_getStatus();
								}, function(response) {
									console.log(response);
									openModal("Fehler", response.data.message);
								});
					};
					
					$scope.postAllContacts = function() {
						
						prepareContacts();
						

						var header = Headers;
						var host = $scope.app.url_back;
						var path_post = $scope.api.postContacts;
						var config = {
							headers : header
						}

						var post_data = {
							contacts : 	$scope.data.seq_contacts
						}
						
						$http.post(host + path_post, post_data,
								config).then(
								function(response) {
									console.log(response.data.data)
									openModal("Erfolg", response.data.message);
									init_getStatus();
								}, function(response) {
									openModal("Fehler", response.data.message);
								});
					};

					var openModal = function(header, message) {
						$scope.html.header = header;
						$scope.html.message = message;
						$('#modalinfo').openModal();
					};

					$scope.openToast = function(s) {
						if (s != null) {
							Materialize.toast(s, 3000);
						}
					};
					


					var init_compositeData = function(d) {

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
								phone : ('+' + d.business_address.phone)
										.replace(/\|/g, ' '),
								mobile : ('+' + d.business_address.mobile_phone)
										.replace(/\|/g, ' '),
								birthday : d.birth_date.day + '.'
										+ d.birth_date.month + '.'
										+ d.birth_date.year
							}
						}

					};

					var init_addEmployee = function() {

						var header = Headers;
						var host = $scope.app.url_back;
						var path_get = $scope.api.getEmployee;
						var path_post = $scope.api.postEmployee;
						var config = {
							headers : header
						}

						var d = $scope.data.ui;

						var active_email = d.active_email;

						$http.get(
								host + path_get + '?email_employee='
										+ active_email).then(
								function(response) {
									if (response.data.employee == null) {

										var post_data = {
											email_employee : active_email,
											firstname : d.first_name,
											lastname : d.last_name,
											position : d.title,
											phone : d.phone,
											picture : d.picture
										}

										$http.post(host + path_post, post_data,
												config).then(
												function(response) {
												}, function(response) {
												});
									}
								}, function(response) {
								});
					};
					
					var init_getStatus = function() {
						var header = Headers;
						var host = $scope.app.url_back;
						var path_get = $scope.api.getContactStatus;
						var config = {
							headers : header
						}

						var active_email = $scope.data.ui.active_email;

						$http.get(
								host + path_get + '/' + active_email).then(
								function(response) {
									$scope.data.status = response.data.result;
									console.log($scope.data.status);
									init_createChart();
								}, function(response) {
									openModal("Fehler", response.data.message);
								});
						
					};

					var init_createChart = function() {

						var s = $scope.status;
						var d = $scope.data.status;
						Chart.defaults.global.legend.position = "right";
						Chart.defaults.global.legend.fullWidth = true;
						Chart.defaults.global.responsive = false;

						var data = {
							labels : [ "" + s.NEW, "" + s.INTERESTING ],
							datasets : [ {
								data : [ d.NEW , d.INTERESTING ],
								backgroundColor : [ "#FF6384", "#36A2EB"],
								hoverBackgroundColor : [ "#FF6384", "#36A2EB"]
							} ]
						};
						var ctx = document.getElementById("myChart")
								.getContext("2d");
						var pieChart = new Chart(
								ctx,
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

					
					var prepareContacts = function(){
						
						var contacts = $scope.data.contacts;
						var email_employee = $scope.data.employee.active_email;
						$scope.data.seq_contacts = [];
						
						for (var i = 0; i < contacts.length; i++) {
							
							var temp = contacts[i];
							var temp_seqc = {
									email_contact : Math.floor(Math.random() * 100000) + temp.active_email, //  TODO: Delete Math random
									firstname : temp.first_name ,
									lastname : temp.last_name,
									company : temp.professional_experience.primary_company.name,
									position : temp.professional_experience.primary_company.title,
									phone : ('+' + temp.business_address.phone)
									.replace(/\|/g, ' '),
									picture : temp.photo_urls.size_256x256,
									permalink : temp.permalink,
									email_employee : email_employee
							}
							
							$scope.data.seq_contacts.push(temp_seqc);
						}
					}
				});