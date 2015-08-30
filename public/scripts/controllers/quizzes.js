'use strict';
angular.module('app.controllers')
.controller('CreateQuizCtrl', function($scope, $http, $location, $modal, $sanitize, logger) {
	var original;
	$scope.questions = [];

	var url = $scope.rootUrl + '/api/questions';
	$http.get(url).success(function(data) {
		$scope.questions = data;
	});

	$scope.questionById = function(id) {
		for (var i in $scope.questions)
			if (id === $scope.questions[i]._id)
				return $scope.questions[i];
	};

	$scope.quizz = {
		name: '',
		description: '',
		questions: []
	};

	$scope.addQuestion = function(id) {
		$scope.quizz.questions.push(id);
	};

	$scope.showInfoOnSubmit = !1, original = angular.copy($scope.quizz);

	$scope.revert = function() {
		return $scope.quizz = angular.copy(original);
	};
	$scope.canRevert = function() {
		return !angular.equals($scope.quizz, original);
	};
	$scope.canSubmit = function() {
		return !angular.equals($scope.quizz, original);
	};
	$scope.submitForm = function() {
		var url = $scope.rootUrl + '/api/quizzes';

		for (var i in $scope.questions)
			if ($scope.questions[i].selected)
				$scope.quizz.questions.push($scope.questions[i]._id);
				//$scope.quizz.questions.push($scope.questions[i])

		console.log($scope.quizz);
    $http.post(url, $scope.quizz).success(function(data) {
      $location.path('/quizzes');
    	$scope.revert();
      return logger.logSuccess('Operação realizada com sucesso.');

    }).error(function(data) {
      logger.logError('Ocorreu algum problema.');
    });
	};
})
.controller('AnswerQuizCtrl', function($scope, $http, $routeParams, $location, $modal, $sce, logger) {
	var id = $routeParams.id; $scope.answers = [];
	var original;

	$scope.ue = { oi: 'oi' };
	$scope.okkk = "eae";
	$scope.index = 0;


	$scope.setIndex = function(index) {
		$scope.index = index;
	};

	$scope.next = function() {
		if($scope.index < $scope.quizz.questions.length) $scope.index++;
		$scope.quizz.questions[$scope.index].active = true;
	};

	$scope.prev = function() {
		if($scope.index > 0) $scope.index--;
		$scope.quizz.questions[$scope.index].active = true;
	};

	$scope.verify = function(index) {
		if($scope.answers[index] === undefined) {
			logger.logWarning('Escolha uma opção');
		} else if($scope.answers[index] == $scope.quizz.questions[index].answer) {
			logger.logSuccess('Correto')

		} else {
			logger.logError('Errado');

		}
	};

	var url = $scope.rootUrl + '/api/quizzes/' + id;
	$http.get(url).success(function(data) {
		if(data.err) {
			logger.logWarning('Ocorreu algum problema.');
			$location.path('/quizzes');
		}
		console.log(data);
		$scope.quizz = data;
		$scope.answers = new Array(data.questions.length);
		for (var i = 0; i < $scope.answers.length; i++)
			$scope.quizz.questions[i].description = $sce.trustAsHtml($scope.quizz.questions[i].description);
		// for (var i = 0; i < $scope.answers.length; i++) $scope.answers[i] = null;

		$scope.showInfoOnSubmit = !1; original = angular.copy($scope.quizz);
	}).error(function(data) {
		logger.logWarning('Ocorreu algum problema.');
		$location.path('/quizzes');
	});

	$scope.showInfoOnSubmit = !1, original = angular.copy($scope.quizz);

	$scope.revert = function() {
		return $scope.quizz = angular.copy(original)
	};
	$scope.canRevert = function() {
		return !angular.equals($scope.quizz, original)
	};
	$scope.canSubmit = function() {
		return $scope.answers.indexOf(null) == -1
	};
	$scope.submitForm = function() {
    $http.post(url, { submission: $scope.answers }).success(function(data) {
      $location.path('/quizzes');
    	$scope.revert()
      return logger.logSuccess('Operação realizada com sucesso.');
    }).error(function(data) {
      logger.logError('Ocorreu algum problema.');
    });
	};
})
.controller('SubmissionsQuizCtrl', function($scope, $http, $routeParams, $location, $modal, logger) {
	var id = $routeParams.id; $scope.answers = [];
	var original;

	var url = $scope.rootUrl + '/api/quizzes/' + id;
	$http.get(url).success(function(data) {
		if(data.err) {
			logger.logWarning('Ocorreu algum problema.');
			$location.path('/quizzes');
		}
		$scope.quizz = data;
	}).error(function(data) {
		logger.logWarning('Ocorreu algum problema.');
		$location.path('/quizzes');
	});

	$scope.openModal = function(submission) {
	  var modalInstance;
	  modalInstance = $modal.open({
	    templateUrl: "submissionModal.html",
	    controller: function($scope, $rootScope, $modalInstance, questions) {
	      $scope.name = submission.student.name;
	      $scope.answers = submission.answers;
				$scope.questions = questions;

	      $scope.ok = function() {
	        $modalInstance.close();
	      };
	      $scope.cancel = function() {
	        $modalInstance.dismiss("cancel");
	      };
				$scope.indexChar = function (index) {
			    return String.fromCharCode(65 + index);
				};
	    },
	    resolve: {
	      questions: function() {
	        //return $scope.user.disciplines[discipline_id].schedule;
	        return $scope.quizz.questions;
	      }
	    }
	  }), modalInstance.result.then(function(selectedItem) {
	    $scope.selected = selectedItem
	  }, function() {
	    //$log.info("Modal dismissed at: " + new Date)
	  })
	};

})
.controller('ViewQuizzesCtrl', function($scope, $http, $location, logger) {
	var url = $scope.rootUrl + '/api/quizzes';
	$http.get(url).success(function(data) {
		$scope.viewData = data;
	});

})
