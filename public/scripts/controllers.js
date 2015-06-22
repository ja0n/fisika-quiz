;(function() {
	"use strict";
	angular.module("app.controllers", [])
	.controller("AppCtrl", ["$scope", "$location", function($scope, $location) {
		return $scope.isSpecificPage = function() {
			var path;
			return path = $location.path(), _.contains(["/404", "/pages/500", "/pages/login", "/pages/signin", "/pages/signin1", "/pages/signin2", "/pages/signup", "/pages/signup1", "/pages/signup2"], path)
		}, $scope.main = {
			brand: "Fisika",
			name: "Jaon Boe"
		}
	}])
	.controller("CreateQuizCtrl",  function($scope, $http, $location, $modal, logger) {
		var original;
		$scope.place = {
			name: '',
			description: '',
			address: '',
			telephones: '',
			coords: {}
		}

		$scope.openModal = function(discipline_id) {
	    var modalInstance;
	    modalInstance = $modal.open({
	      templateUrl: "scheduleTmpl.html",
	      controller: function($scope, $rootScope, $modalInstance, items) {
	        $scope.items = items;
	        $scope.schedule = { start_time: new Date(), duration: 0 };
	        $scope.dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	        $scope.discipline_id = discipline_id;

	        $scope.ok = function() {
	          $modalInstance.close();
	        };
	        $scope.cancel = function() {
	          $modalInstance.dismiss("cancel");
	        };
	        $scope.add = function() {
	          var time = $scope.schedule.start_time;
	          $scope.schedule.start_time = { hours: time.getHours(), minutes: time.getMinutes() };
	          $scope.schedule.discipline_id = discipline_id;
	          $scope.items.push($scope.schedule);
	          $scope.schedule = { start_time: new Date(), duration: 0 };
	        };
	      },
	      resolve: {
	        items: function() {
	          //return $scope.user.disciplines[discipline_id].schedule;
	          return $scope.user.schedule;
	        }
	      }
	    }), modalInstance.result.then(function(selectedItem) {
	      $scope.selected = selectedItem
	    }, function() {
	      //$log.info("Modal dismissed at: " + new Date)
	    })
	  };

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
			var url = 'http://' + location.hostname + ':3000/api/professors';
	    $http.post(url, $scope.place).success(function(data) {
	      $location.path('/professors');
	    	$scope.revert()
	      return logger.logSuccess('Operação realizada com sucesso.');

	    }).error(function(data) {
	      logger.logError("Ocorreu algum problema.");
	    });
		}
	})
	.controller("ViewQuizzesCtrl", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/quizzes';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});

	})
	.controller("CreateStudentCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var marker;

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
	}])
	.controller("ViewStudentsCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/clients';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});
	}])
	.controller("CreateProfessorCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/professors';
		$http.get(url).success(function(data) {
			$scope.selectData = data;
		});
		var original;
		$scope.dealer = {
			name: '',
			email: '',
			password: '',
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
			var url = 'http://' + location.hostname + ':3000/api/professors';
	    $http.post(url, $scope.dealer).success(function(data) {
	      $location.path('/professors');
	    	$scope.revert()
	      return logger.logSuccess('Operação realizada com sucesso.');

	    }).error(function(data) {
	      logger.logError("Ocorreu algum problema.");
	    });
		}
	}])
	.controller("ViewProfessorsCtrl", ["$scope", "$http", "$location", "logger", function($scope, $http, $location, logger) {
		var url = 'http://' + location.hostname + ':3000/api/professors';
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
