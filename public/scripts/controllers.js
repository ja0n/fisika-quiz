(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('app.controllers', [])
.controller('AppCtrl', function($scope, $location, $http, logger, auth) {
	$scope._ = _;
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

},{}],2:[function(require,module,exports){
'use strict';
angular.module('app.controllers')
.controller('CreateProfessorCtrl', function($scope, $http, $location, logger) {
	var url = $scope.rootUrl + '/api/professors';
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
		var url = $scope.rootUrl + '/api/professors';
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

	var url = $scope.rootUrl + '/api/professors/' + id;
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
	var url = $scope.rootUrl + '/api/professors';
	$http.get(url).success(function(data) {
		$scope.viewData = data;
	});
})

},{}],3:[function(require,module,exports){
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

	$scope.remove = function(data) {
		//deleta do store original
		//e recalcula o currentPageStores
		var url = $scope.rootUrl + '/api/' + 'questions' + '/' + data._id;

		$http.delete(url).success(function() {
			var index = $scope.stores.indexOf(data);
			if(index != -1) {
				$scope.stores.splice(index, 1);
				$scope.search();
				$scope.select($scope.currentPage);
				logger.logSuccess('Operação realizada com sucesso.');
			}
		}).error(function(data) {
			logger.logWarning('Ocorreu algum problema.');
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

},{}],4:[function(require,module,exports){
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
	var id = $routeParams.id;
	$scope.answers = [];
	$scope.attempts = [];
	var original;

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
		if(!$scope.attempts[index]) $scope.attempts[index] = [];

		if($scope.answers[index] === undefined) {
			logger.logWarning('Escolha uma opção');
		} else if($scope.answers[index] == $scope.quizz.questions[index].answer) {
			$scope.attempts[index].push($scope.answers[index]);
			logger.logSuccess('Correto');
		} else {
			$scope.attempts[index].push($scope.answers[index]);
			logger.logError('Errado');
		}
		console.log($scope.attempts);
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
		$scope.attempts = _.range(data.questions.length).map(function() { return [] });
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
		return $scope.quizz = angular.copy(original);
	};
	$scope.canRevert = function() {
		return !angular.equals($scope.quizz, original);
	};
	$scope.canSubmit = function() {
		return $scope.answers.indexOf(null) == -1;
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
	  var modalInstance = $modal.open({
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
	  });
		modalInstance.result.then(function(selectedItem) {
	    $scope.selected = selectedItem
	  }, function() {
	    //$log.info("Modal dismissed at: " + new Date)
	  });
	};

})
.controller('ViewQuizzesCtrl', function($scope, $http, $location, logger) {
	var url = $scope.rootUrl + '/api/quizzes';
	$http.get(url).success(function(data) {
		$scope.viewData = data;
	});
})

},{}],5:[function(require,module,exports){
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
		var url = $scope.rootUrl + '/api/students';
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

	var url = $scope.rootUrl + '/api/students/' + id;
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
	var url = $scope.rootUrl + '/api/students';
	$http.get(url).success(function(data) {
		$scope.viewData = data;
	});
})

},{}]},{},[1,2,3,4,5]);
