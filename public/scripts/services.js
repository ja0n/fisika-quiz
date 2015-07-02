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
}.call(this)
