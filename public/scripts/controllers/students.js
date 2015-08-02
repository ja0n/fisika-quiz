;(function() {
	'use strict';
	angular.module('app.controllers')
	.controller('CreateStudentCtrl', function($scope, $http, $location, logger) {
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
			var url = rootUrl + '/api/students';
	    $http.post(url, $scope.client).success(function(data) {
	      if (data.err) return logger.logError('Ocorreu algum problema.');
	      else {
					logger.logSuccess('Operação realizada com sucesso.');
					$location.path('/students');
					$scope.revert();
				}

	    }).error(function(data) {
	      logger.logError('Ocorreu algum problema.');
	    });
		}
	})
	.controller('EditStudentCtrl', function($scope, $http, $routeParams, $location, logger) {
		var id = $routeParams.id;
		var original;

		var url = rootUrl + '/api/students/' + id;
		$http.get(url).success(function(data) {
			if(data.err) {
				logger.logWarning('Ocorreu algum problema.');
				$location.path('/students');
			}
			$scope.client = data;
			$scope.showInfoOnSubmit = !1, original = angular.copy($scope.client);
		}).error(function(data) {
			logger.logWarning('Ocorreu algum problema.');
			$location.path('/students');
		});

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
	    $http.put(url, $scope.client).success(function(data) {
	      if (data.err) return logger.logError('Ocorreu algum problema.');
	      else {
					logger.logSuccess('Operação realizada com sucesso.');
					$location.path('/students');
					$scope.revert();
				}
	    }).error(function(data) {
	      logger.logError('Ocorreu algum problema.');
	    });
		}
	})
	.controller('ViewStudentsCtrl', function($scope, $http, $location, logger) {
		var url = rootUrl + '/api/students';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});
	})
}).call(this)
