'use strict';

angular.module('app.controllers', [])
.controller('AppCtrl', function($scope, $location, $http, logger, auth) {
	$scope.rootUrl = 'http://' + location.host;
	$scope.main = {
		brand: 'POPE',
		description: 'Platform for Online Problems and Exercises'
	};

	$scope.indexChar = function (index) {
    return String.fromCharCode(65 + index);
	};

	$scope.isSpecificPage = function() {
		var path;
		return path = $location.path(), _.contains(['/404', '/pages/500', '/login', '/pages/signin', '/pages/signin1', '/pages/signin2', '/pages/signup', '/pages/signup1', '/pages/signup2'], path);
	};

	$scope.submitLogin = function(user) {
		if(user.email && user.password) {
			auth.login(user, function(status) {
				if(status.err) {
					logger.logWarning(status.msg);
				} else if(status.data) {
					logger.logSuccess(status.msg);
					$location.path('/dashboard');
				}
			});
		} else logger.logWarning('Precisa preencher os campos.');
	};

	$scope.logout = function() {
		auth.logout(function(status) {
			if(status.err) {
				logger.logDanger(status.msg);
			} else {
				logger.logSuccess(status.msg);
				$location.path('/login');
			}
		});
	};

	$scope.deleteById = function (path, list, index, id) {
		var url = $scope.rootUrl + '/api/' + path + '/' + id;
		$http.delete(url).success(function(data) {
			list.splice(index, 1);
			logger.logSuccess('Operação realizada com sucesso.');
		}).error(function(data) {
			logger.logWarning('Ocorreu algum problema.');
		});
	};
	return $scope.auth = auth, $scope.deleteById;
})
.controller('NavCtrl', function($scope, filterFilter) {
	return null;
})
.controller('DashboardCtrl', ['$scope', function($scope) {
	return;
}])
