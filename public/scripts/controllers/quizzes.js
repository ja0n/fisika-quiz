;(function() {
	'use strict';
	angular.module('app.controllers')
	.controller('CreateQuizCtrl', function($scope, $http, $location, $modal, logger) {
		var original;

		$scope.quizz = {
			name: '',
			description: 'show',
			questions: [{ title: 'Questão 1', description: 'Insira o enunciado aqui', alternatives: [], answer: null, disabled: false }]
		};

		$scope.addQuestion = function() {
			$scope.quizz.questions.push({ title: 'Questão ' + ($scope.quizz.questions.length+1),
													description: 'Insira o enunciado aqui',
													alternatives: [],
													active: true });
		};

		$scope.addAlt = function(alternatives, scope) {
			var newAlt = scope.newAlt.trim();
			0 !== newAlt.length ? (alternatives.push({ description: newAlt, correct: !1 }),
			logger.logSuccess('Alternativa adicionada'), scope.newAlt = '') : void 0;
		};

		$scope.edit = function(task) {
			return $scope.editedTask = task
		};

		$scope.doneEditing = function(alt, index, e) {
			$scope.editedTask = null;
			alt.description = alt.description.trim();
			alt.description ? logger.log('Alternativa atualizada') : $scope.remove(alt)
		};

		$scope.remove = function(task, tasks) {
			var index = tasks.indexOf(task);
			tasks.splice(index, 1);
			logger.logError('Alternativa removida');
		};

		$scope.clearCompleted = function() {
			return $scope.tasks = tasks = tasks.filter(function(val) {
				return !val.correct;
			});
		};
		$scope.markAll = function(correct) {
			return tasks.forEach(function(task) {
				return task.correct = correct;
			}), $scope.remainingCount = correct ? 0 : tasks.length, correct ? logger.logSuccess('Congrats! All done :)') : void 0;
		};

		$scope.showInfoOnSubmit = !1, original = angular.copy($scope.quizz);

		$scope.revert = function() {
			return $scope.quizz = angular.copy(original)
		}
		$scope.canRevert = function() {
			return !angular.equals($scope.quizz, original)
		}
		$scope.canSubmit = function() {
			return !angular.equals($scope.quizz, original)
		}
		$scope.submitForm = function() {
			var url = rootUrl + '/api/quizzes';
	    $http.post(url, $scope.quizz).success(function(data) {
	      $location.path('/quizzes');
	    	$scope.revert()
	      return logger.logSuccess('Operação realizada com sucesso.');

	    }).error(function(data) {
	      logger.logError('Ocorreu algum problema.');
	    });
		}
	})
	.controller('AnswerQuizCtrl', function($scope, $http, $routeParams, $location, $modal, logger) {
		var id = $routeParams.id; $scope.answers = [];
		var original;

		var url = rootUrl + '/api/quizzes/' + id;
		$http.get(url).success(function(data) {
			if(data.err) {
				logger.logWarning('Ocorreu algum problema.');
				$location.path('/quizzes');
			}
			$scope.quizz = data;
			$scope.answers = new Array(data.questions.length);
			for (var i = 0; i < $scope.answers.length; i++) $scope.answers[i] = null;

			$scope.showInfoOnSubmit = !1, original = angular.copy($scope.quizz);
		}).error(function(data) {
			logger.logWarning('Ocorreu algum problema.');
			$location.path('/quizzes');
		});

		$scope.showInfoOnSubmit = !1, original = angular.copy($scope.quizz);

		$scope.revert = function() {
			return $scope.quizz = angular.copy(original)
		}
		$scope.canRevert = function() {
			return !angular.equals($scope.quizz, original)
		}
		$scope.canSubmit = function() {
			return $scope.answers.indexOf(null) == -1
		}
		$scope.submitForm = function() {
	    $http.post(url, { submission: $scope.answers}).success(function(data) {
	      $location.path('/quizzes');
	    	$scope.revert()
	      return logger.logSuccess('Operação realizada com sucesso.');

	    }).error(function(data) {
	      logger.logError('Ocorreu algum problema.');
	    });
		}
	})
	.controller('SubmissionsQuizCtrl', function($scope, $http, $routeParams, $location, $modal, logger) {
		var id = $routeParams.id; $scope.answers = [];
		var original;

		var url = rootUrl + '/api/quizzes/' + id;
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
		var url = rootUrl + '/api/quizzes';
		$http.get(url).success(function(data) {
			$scope.viewData = data;
		});

	})
}).call(this)
