;(function() {
	"use strict";
	angular.module("app.controllers", [])
	.controller("AppCtrl", ["$scope", "$location", function($scope, $location) {
		return $scope.isSpecificPage = function() {
			var path;
			return path = $location.path(), _.contains(["/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2"], path)
		}, $scope.main = {
			brand: "AguaJá",
			name: "Jaon Boe"
		}
	}])
	.controller("CreatePlaceCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var marker;

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(initialize);
			} else {
				console.log("Geolocation is not supported by this browser.");
			}
		}

		function initialize(position) {
			var mapOptions = {
				//center: new google.maps.LatLng(-34.397, 150.644),
				center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			google.maps.event.addListener(map, 'click', function(e) {
    		placeMarker(e.latLng, map);
			});
		}

		function placeMarker(position, map) {
			$scope.place.coords = {lat: position.lat(), lng: position.lng()};
			$scope.$apply();
			if(marker) marker.setMap(null);
		  marker = new google.maps.Marker({
		    position: position,
		    map: map
		  });
		  //map.panTo(position);
		}

		var original;
		$scope.place = {
			name: '',
			description: '',
			address: '',
			telephones: '',
			coords: {}
		}
		$scope.showInfoOnSubmit = !1, original = angular.copy($scope.place);
		$scope.revert = function() {
			return $scope.place = angular.copy(original), $scope.place_form.$setPristine()
		}
		$scope.canRevert = function() {
			return !angular.equals($scope.place, original) || !$scope.place_form.$pristine
		}
		$scope.canSubmit = function() {
			return $scope.place_form.$valid && !angular.equals($scope.place, original)
							&& $scope.place.coords.lat && $scope.place.coords.lng
		}
		$scope.submitForm = function() {
			var url = 'http://' + location.hostname + ':3000/api/places';
	    $http.post(url, $scope.place).success(function(data) {
	      $location.path('/places');
	    	$scope.revert()
	      return logger.logSuccess('Operação realizada com sucesso.');

	    }).error(function(data) {
	      logger.logError("Ocorreu algum problema.");
	    });
		}
		getLocation();
	}])
	.controller("ViewPlacesCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/places';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});

	}])
	.controller("PlacesInMapCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var map;

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(initialize);
			} else {
				console.log("Geolocation is not supported by this browser.");
			}
		}

		function initialize(position) {
			var mapOptions = {
				//center: new google.maps.LatLng(-34.397, 150.644),
				center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

			var url = 'http://' + location.hostname + ':3000/api/places';
			$http.get(url).success(function(data) {
				loadMarkers(map, data);
			});
		}

		function placeMarker(position, map) {
			$scope.marker.coords = {lat: position.lat(), lng: position.lng()};
			$scope.$apply();
			if(marker) marker.setMap(null);
		  marker = new google.maps.Marker({
		    position: position,
		    map: map
		  });

		  //map.panTo(position);
		}

		function loadMarkers(map, markers) {
			markers.forEach(function(marker) {
				var position = new google.maps.LatLng(marker.coords.lat, marker.coords.lng);
				new google.maps.Marker({
			    position: position,
			    map: map
			  });
			});

		}

		getLocation();
	}])
	.controller("CreateClientCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var marker;

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(initialize);
			} else {
				console.log("Geolocation is not supported by this browser.");
			}
		}

		function initialize(position) {
			var mapOptions = {
				//center: new google.maps.LatLng(-34.397, 150.644),
				center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			google.maps.event.addListener(map, 'click', function(e) {
    		placeMarker(e.latLng, map);
			});
		}

		function placeMarker(position, map) {
			$scope.client.coords = {lat: position.lat(), lng: position.lng()};
			$scope.$apply();
			if(marker) marker.setMap(null);
		  marker = new google.maps.Marker({
		    position: position,
		    map: map
		  });
		  //map.panTo(position);
		}

		var original;
		$scope.client = {
			name: '',
			email: '',
			password: '',
			description: '',
			address: '',
			telephones: '',
			coords: {}
		}
		$scope.showInfoOnSubmit = !1, original = angular.copy($scope.client);
		$scope.revert = function() {
			return $scope.client = angular.copy(original), $scope.client_form.$setPristine()
		}
		$scope.canRevert = function() {
			return !angular.equals($scope.client, original) || !$scope.client_form.$pristine
		}
		$scope.canSubmit = function() {
			return $scope.client_form.$valid && !angular.equals($scope.client, original)
		}
		$scope.submitForm = function() {
			var url = 'http://' + location.hostname + ':3000/api/clients';
	    $http.post(url, $scope.client).success(function(data) {
	      if (data.err) return logger.logError("Ocorreu algum problema.");
	      else {
					logger.logSuccess('Operação realizada com sucesso.');
					$location.path('/clients');
					$scope.revert();
				}

	    }).error(function(data) {
	      logger.logError("Ocorreu algum problema.");
	    });
		}
		getLocation();
	}])
	.controller("ViewClientsCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/clients';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});
	}])
	.controller("CreateDealerCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/places';
		$http.get(url).success(function(data) {
			$scope.selectData = data;
		});
		var original;
		$scope.dealer = {
			name: '',
			email: '',
			password: '',
			description: '',
			place_id: '',
			telephones: '',
		}
		$scope.showInfoOnSubmit = !1, original = angular.copy($scope.dealer);
		$scope.revert = function() {
			return $scope.dealer = angular.copy(original), $scope.dealer_form.$setPristine()
		}
		$scope.canRevert = function() {
			return !angular.equals($scope.dealer, original) || !$scope.dealer_form.$pristine
		}
		$scope.canSubmit = function() {
			return $scope.dealer_form.$valid && !angular.equals($scope.dealer, original)
		}
		$scope.submitForm = function() {
			var url = 'http://' + location.hostname + ':3000/api/dealers';
	    $http.post(url, $scope.dealer).success(function(data) {
	      $location.path('/dealers');
	    	$scope.revert()
	      return logger.logSuccess('Operação realizada com sucesso.');

	    }).error(function(data) {
	      logger.logError("Ocorreu algum problema.");
	    });
		}
	}])
	.controller("ViewDealersCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/dealers';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});
	}])
	.controller("NavCtrl", ["$scope", "taskStorage", "filterFilter", function($scope, taskStorage, filterFilter) {
		var tasks;
		return tasks = $scope.tasks = taskStorage.get(), $scope.taskRemainingCount = filterFilter(tasks, {
			completed: !1
		}).length, $scope.$on("taskRemaining:changed", function(event, count) {
			return $scope.taskRemainingCount = count
		})
	}])
	.controller("DashboardCtrl", ["$scope", function($scope) {
		return $scope.comboChartData = [
			["Month", "Bolivia", "Ecuador", "Madagascar", "Papua New Guinea", "Rwanda", "Average"],
			["2014/05", 165, 938, 522, 998, 450, 614.6],
			["2014/06", 135, 1120, 599, 1268, 288, 682],
			["2014/07", 157, 1167, 587, 807, 397, 623],
			["2014/08", 139, 1110, 615, 968, 215, 609.4],
			["2014/09", 136, 691, 629, 1026, 366, 569.6]
		], $scope.salesData = [
			["Year", "Sales", "Expenses"],
			["2010", 1e3, 400],
			["2011", 1170, 460],
			["2012", 660, 1120],
			["2013", 1030, 540]
		]
	}])
}).call(this)
