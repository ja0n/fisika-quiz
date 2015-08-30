'use strict';
angular.module('app.controllers')
.controller('CreateQuestionCtrl', function($scope, $http, $routeParams, $location, $modal, logger) {
	var original, url, id = $routeParams.id
	CKEDITOR.replace('test');

	if (id) {
		url = $scope.rootUrl + '/api/questions/' + id;
		$http.get(url).success(function(data) {
			$scope.question = data;
			original = angular.copy($scope.question);
			console.log(CKEDITOR.instances.test);
			setTimeout(function() {
				CKEDITOR.instances.test.setData(data.description);
			}, 200);
		}).error(function(data) {
			logger.logError('Ocorreu algum problema.');
		});
	}

	url = $scope.rootUrl + '/api/tags';
	$http.get(url).success(function(data) {
		$scope.selectData = data.questions;
	}).error(function(data) {
		logger.logError('Ocorreu algum problema.');
	});


	$scope.question = {
		title: '',
		description: '',
		alternatives: [],
		answer: null,
	};

	$scope.addAlt = function(scope) {
		var newAlt = scope.newAlt.trim();
		0 !== newAlt.length ? ($scope.question.alternatives.push({ description: newAlt, correct: !1 }),
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

	$scope.showInfoOnSubmit = !1, original = angular.copy($scope.question);

	$scope.revert = function() {
		return $scope.question = angular.copy(original)
	}
	$scope.canRevert = function() {
		return !angular.equals($scope.question, original)
	}
	$scope.canSubmit = function() {
		return !angular.equals($scope.question, original)
	}
	$scope.submitForm = function() {
		$scope.question.description = CKEDITOR.instances.test.getData();
		var url = $scope.rootUrl + '/api/questions/';
		var Promise = id
		? $http.put(url + id, $scope.question).success(function(data) {
      $location.path('/questions');
    	$scope.revert()
      return logger.logSuccess('Operação realizada com sucesso.');
    })
		: $http.post(url, $scope.question).success(function(data) {
      $location.path('/questions');
    	$scope.revert()
      return logger.logSuccess('Operação realizada com sucesso.');
    });

		Promise.error(function(data) {
      logger.logError('Ocorreu algum problema.');
    });
	}
})
.controller('AnswerQuestionCtrl', function($scope, $http, $routeParams, $location, $modal, logger) {
	var id = $routeParams.id; $scope.answers = [];
	var original;

	var url = $scope.rootUrl + '/api/quizzes/' + id;
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
.controller('SubmissionsQuestionCtrl', function($scope, $http, $routeParams, $location, $modal, logger) {
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
.controller('ViewQuestionsCtrl', function($scope, $http, $location, $modal, $filter, logger) {
	var url = $scope.rootUrl + '/api/questions/';
	$http.get(url).success(function(data) {
		$scope.stores = data;
		$scope.search();
		$scope.select($scope.currentPage);
	});

	$scope.previewQuestion = function(id) {
	  return $modal.open({
	    templateUrl: "previewModal.html",
	    controller: function($scope, $rootScope, $modalInstance, $http, $sce) {
				$http.get(url + id).success(function (data) {
					$scope.title = data.title;
					$scope.description = $sce.trustAsHtml(data.description);
					$scope.alternatives = data.alternatives;
					$scope.answer = data.answer;
				});

	      $scope.ok = function() {
	        $modalInstance.close();
	      };
				$scope.indexChar = function (index) {
			    return String.fromCharCode(65 + index);
				};
	    }
	  });
	};

	return $scope.searchKeywords = "",
	$scope.filteredStores = [],
	$scope.row = "",
	$scope.select = function(page) {
		var end, start;
		return start = (page - 1) * $scope.numPerPage, end = start + $scope.numPerPage, $scope.currentPageStores = $scope.filteredStores.slice(start, end)
	},
	$scope.onFilterChange = function() {
		return $scope.select(1), $scope.currentPage = 1, $scope.row = ""
	},
	$scope.onNumPerPageChange = function() {
		return $scope.select(1), $scope.currentPage = 1
	},
	$scope.onOrderChange = function() {
		return $scope.select(1), $scope.currentPage = 1
	},
	$scope.search = function() {
		return $scope.filteredStores = $filter("filter")($scope.stores, $scope.searchKeywords), $scope.onFilterChange()
	},
	$scope.order = function(rowName) {
		return $scope.row !== rowName ? ($scope.row = rowName, $scope.filteredStores = $filter("orderBy")($scope.stores, rowName), $scope.onOrderChange()) : void 0
	},
	$scope.numPerPageOpt = [3, 5, 10, 20], $scope.numPerPage = $scope.numPerPageOpt[2], $scope.currentPage = 1, $scope.currentPageStores = []
})
