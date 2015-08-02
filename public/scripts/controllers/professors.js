;(function() {
	'use strict';
	angular.module('app.controllers')
	.controller('CreateProfessorCtrl', function($scope, $http, $location, logger) {
		var url = rootUrl + '/api/professors';
		$http.get(url).success(function(data) {
			$scope.selectData = data;
		});
		var original;
		$scope.professor = {
			name: '',
			email: '',
			password: '',
		}
		$scope.showInfoOnSubmit = !1, original = angular.copy($scope.professor);
		$scope.revert = function() {
			return $scope.professor = angular.copy(original), $scope.professor_form.$setPristine()
		}
		$scope.canRevert = function() {
			return !angular.equals($scope.professor, original) || !$scope.professor_form.$pristine
		}
		$scope.canSubmit = function() {
			return $scope.professor_form.$valid && !angular.equals($scope.professor, original)
		}
		$scope.submitForm = function() {
			var url = rootUrl + '/api/professors';
	    $http.post(url, $scope.professor).success(function(data) {
	      $location.path('/professors');
	    	$scope.revert()
	      return logger.logSuccess('Operação realizada com sucesso.');

	    }).error(function(data) {
	      logger.logError('Ocorreu algum problema.');
	    });
		}
	})
	.controller('EditProfessorCtrl', function($scope, $http, $routeParams, $location, logger) {
		var id = $routeParams.id;
		var original;

		var url = rootUrl + '/api/professors/' + id;
		$http.get(url).success(function(data) {
			if(data.err) {
				logger.logWarning('Ocorreu algum problema.');
				$location.path('/professors');
			}
			$scope.professor = data;
			$scope.showInfoOnSubmit = !1, original = angular.copy($scope.professor);
		}).error(function(data) {
			logger.logWarning('Ocorreu algum problema.');
			$location.path('/professors');
		});

		$scope.revert = function() {
			return $scope.professor = angular.copy(original), $scope.professor_form.$setPristine()
		}
		$scope.canRevert = function() {
			return !angular.equals($scope.professor, original) || !$scope.professor_form.$pristine
		}
		$scope.canSubmit = function() {
			return $scope.professor_form.$valid && !angular.equals($scope.professor, original)
		}
		$scope.submitForm = function() {
	    $http.put(url, $scope.professor).success(function(data) {
	      if (data.err) return logger.logError('Ocorreu algum problema.');
	      else {
					logger.logSuccess('Operação realizada com sucesso.');
					$location.path('/professors');
					$scope.revert();
				}
	    }).error(function(data) {
	      logger.logError('Ocorreu algum problema.');
	    });
		}
	})
	.controller('ViewProfessorsCtrl', function($scope, $http, $location, logger) {
		var url = rootUrl + '/api/professors';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});
	})
}).call(this)
