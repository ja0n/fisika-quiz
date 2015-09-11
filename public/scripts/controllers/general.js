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
		return path = $location.path(), _.contains(['/404', '/pages/500', '/login', '/signup'], path);
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
.controller('DashboardCtrl', function($scope) {
	return;
})
.controller('SignUpCtrl', function($scope, $http, $location, logger) {
	$scope.user = {};
	$scope.submit = function(user) {
		var url = $scope.rootUrl + '/signup';
		if(user.email && user.password && user.name) {
			$http.post(url, user).success(function(data) {
				console.log(data);
				if(data.err) {
					logger.logError('Algo deu errado');
				} else {
					logger.logSuccess('Registrado com sucesso!');
					$location.path('/login');
				}
			});
		} else {
			logger.logWarning('Preencha todos os campos');
		}
	};
	return;
})
