;(function() {
	"use strict";
	angular.module("app.ui.services", []).factory("logger", [function() {
		var logIt;
		return toastr.options = {
			closeButton: !0,
			positionClass: "toast-bottom-right",
			timeOut: "3000"
		}, logIt = function(message, type) {
			return toastr[type](message)
		}, {
			log: function(message) {
				logIt(message, "info")
			}, logWarning: function(message) {
				logIt(message, "warning")
			}, logSuccess: function(message) {
				logIt(message, "success")
			}, logError: function(message) {
				logIt(message, "error")
			}
		}
	}])
}).call(this),
function() {
	"use strict";
	angular.module("app.localization", []).factory("localize", ["$http", "$rootScope", "$window", function($http, $rootScope, $window) {
		var localize;
		return localize = {
			language: "",
			url: void 0,
			resourceFileLoaded: !1,
			successCallback: function(data) {
				return localize.dictionary = data, localize.resourceFileLoaded = !0, $rootScope.$broadcast("localizeResourcesUpdated")
			},
			setLanguage: function(value) {
				return localize.language = value.toLowerCase().split("-")[0], localize.initLocalizedResources()
			},
			setUrl: function(value) {
				return localize.url = value, localize.initLocalizedResources()
			},
			buildUrl: function() {
				return localize.language || (localize.language = ($window.navigator.userLanguage || $window.navigator.language).toLowerCase(), localize.language = localize.language.split("-")[0]), "i18n/resources-locale_" + localize.language + ".js"
			},
			initLocalizedResources: function() {
				var url;
				return url = localize.url || localize.buildUrl(), $http({
					method: "GET",
					url: url,
					cache: !1
				}).success(localize.successCallback).error(function() {
					return $rootScope.$broadcast("localizeResourcesUpdated")
				})
			},
			getLocalizedString: function(value) {
				var result, valueLowerCase;
				return result = void 0, localize.dictionary && value ? (valueLowerCase = value.toLowerCase(), result = "" === localize.dictionary[valueLowerCase] ? value : localize.dictionary[valueLowerCase]) : result = value, result
			}
		}
	}]).directive("i18n", ["localize", function(localize) {
		var i18nDirective;
		return i18nDirective = {
			restrict: "EA",
			updateText: function(ele, input, placeholder) {
				var result;
				return result = void 0, "i18n-placeholder" === input ? (result = localize.getLocalizedString(placeholder), ele.attr("placeholder", result)) : input.length >= 1 ? (result = localize.getLocalizedString(input), ele.text(result)) : void 0
			},
			link: function(scope, ele, attrs) {
				return scope.$on("localizeResourcesUpdated", function() {
					return i18nDirective.updateText(ele, attrs.i18n, attrs.placeholder)
				}), attrs.$observe("i18n", function(value) {
					return i18nDirective.updateText(ele, value, attrs.placeholder)
				})
			}
		}
	}]).controller("LangCtrl", ["$scope", "localize", function($scope, localize) {
		return $scope.lang = "English", $scope.setLang = function(lang) {
			switch (lang) {
				case "English":
					localize.setLanguage("EN-US");
					break;
				case "Español":
					localize.setLanguage("ES-ES");
					break;
				case "日本語":
					localize.setLanguage("JA-JP");
					break;
				case "中文":
					localize.setLanguage("ZH-TW");
					break;
				case "Deutsch":
					localize.setLanguage("DE-DE");
					break;
				case "français":
					localize.setLanguage("FR-FR");
					break;
				case "Italiano":
					localize.setLanguage("IT-IT");
					break;
				case "Portugal":
					localize.setLanguage("PT-BR");
					break;
				case "Русский язык":
					localize.setLanguage("RU-RU");
					break;
				case "한국어":
					localize.setLanguage("KO-KR")
			}
			return $scope.lang = lang
		}
	}])
}.call(this),
function() {
	"use strict";
	angular.module("app.task", []).factory("taskStorage", function() {
		var DEMO_TASKS, STORAGE_ID;
		return STORAGE_ID = "tasks", DEMO_TASKS = '[ {"title": "Finish homework", "completed": true}, {"title": "Make a call", "completed": true}, {"title": "Play games with friends", "completed": false}, {"title": "Shopping", "completed": false}, {"title": "One more dance", "completed": false}, {"title": "Try Google glass", "completed": false} ]', {
			get: function() {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || DEMO_TASKS)
			},
			put: function(tasks) {
				return localStorage.setItem(STORAGE_ID, JSON.stringify(tasks))
			}
		}
	}).directive("taskFocus", ["$timeout", function($timeout) {
		return {
			link: function(scope, ele, attrs) {
				return scope.$watch(attrs.taskFocus, function(newVal) {
					return newVal ? $timeout(function() {
						return ele[0].focus()
					}, 0, !1) : void 0
				})
			}
		}
	}]).controller("taskCtrl", ["$scope", "taskStorage", "filterFilter", "$rootScope", "logger", function($scope, taskStorage, filterFilter, $rootScope, logger) {
		var tasks;
		return tasks = $scope.tasks = taskStorage.get(), $scope.newTask = "", $scope.remainingCount = filterFilter(tasks, {
			completed: !1
		}).length, $scope.editedTask = null, $scope.statusFilter = {
			completed: !1
		}, $scope.filter = function(filter) {
			switch (filter) {
				case "all":
					return $scope.statusFilter = "";
				case "active":
					return $scope.statusFilter = {
						completed: !1
					};
				case "completed":
					return $scope.statusFilter = {
						completed: !0
					}
			}
		}, $scope.add = function() {
			var newTask;
			return newTask = $scope.newTask.trim(), 0 !== newTask.length ? (tasks.push({
				title: newTask,
				completed: !1
			}), logger.logSuccess('New task: "' + newTask + '" added'), taskStorage.put(tasks), $scope.newTask = "", $scope.remainingCount++) : void 0
		}, $scope.edit = function(task) {
			return $scope.editedTask = task
		}, $scope.doneEditing = function(task) {
			return $scope.editedTask = null, task.title = task.title.trim(), task.title ? logger.log("Task updated") : $scope.remove(task), taskStorage.put(tasks)
		}, $scope.remove = function(task) {
			var index;
			return $scope.remainingCount -= task.completed ? 0 : 1, index = $scope.tasks.indexOf(task), $scope.tasks.splice(index, 1), taskStorage.put(tasks), logger.logError("Task removed")
		}, $scope.completed = function(task) {
			return $scope.remainingCount += task.completed ? -1 : 1, taskStorage.put(tasks), task.completed ? $scope.remainingCount > 0 ? logger.log(1 === $scope.remainingCount ? "Almost there! Only " + $scope.remainingCount + " task left" : "Good job! Only " + $scope.remainingCount + " tasks left") : logger.logSuccess("Congrats! All done :)") : void 0
		}, $scope.clearCompleted = function() {
			return $scope.tasks = tasks = tasks.filter(function(val) {
				return !val.completed
			}), taskStorage.put(tasks)
		}, $scope.markAll = function(completed) {
			return tasks.forEach(function(task) {
				return task.completed = completed
			}), $scope.remainingCount = completed ? 0 : tasks.length, taskStorage.put(tasks), completed ? logger.logSuccess("Congrats! All done :)") : void 0
		}, $scope.$watch("remainingCount == 0", function(val) {
			return $scope.allChecked = val
		}), $scope.$watch("remainingCount", function(newVal) {
			return $rootScope.$broadcast("taskRemaining:changed", newVal)
		})
	}])
}.call(this)
