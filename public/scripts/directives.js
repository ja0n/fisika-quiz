;(function() {
	"use strict";
	angular.module("app.chart.directives", []).directive("gaugeChart", [function() {
		return {
			restrict: "A",
			scope: {
				data: "=",
				options: "="
			},
			link: function(scope, ele) {
				var data, gauge, options;
				return data = scope.data, options = scope.options, gauge = new Gauge(ele[0]).setOptions(options), gauge.maxValue = data.maxValue, gauge.animationSpeed = data.animationSpeed, gauge.set(data.val)
			}
		}
	}]).directive("flotChart", [function() {
		return {
			restrict: "A",
			scope: {
				data: "=",
				options: "="
			},
			link: function(scope, ele) {
				var data, options, plot;
				return data = scope.data, options = scope.options, plot = $.plot(ele[0], data, options)
			}
		}
	}]).directive("flotChartRealtime", [function() {
		return {
			restrict: "A",
			link: function(scope, ele) {
				var data, getRandomData, plot, totalPoints, update, updateInterval;
				return data = [], totalPoints = 300, getRandomData = function() {
					var i, prev, res, y;
					for (data.length > 0 && (data = data.slice(1)); data.length < totalPoints;) prev = data.length > 0 ? data[data.length - 1] : 50, y = prev + 10 * Math.random() - 5, 0 > y ? y = 0 : y > 100 && (y = 100), data.push(y);
					for (res = [], i = 0; i < data.length;) res.push([i, data[i]]), ++i;
					return res
				}, update = function() {
					plot.setData([getRandomData()]), plot.draw(), setTimeout(update, updateInterval)
				}, data = [], totalPoints = 300, updateInterval = 200, plot = $.plot(ele[0], [getRandomData()], {
					series: {
						lines: {
							show: !0,
							fill: !0
						},
						shadowSize: 0
					},
					yaxis: {
						min: 0,
						max: 100
					},
					xaxis: {
						show: !1
					},
					grid: {
						hoverable: !0,
						borderWidth: 1,
						borderColor: "#eeeeee"
					},
					colors: ["#cadcaf"]
				}), update()
			}
		}
	}]).directive("sparkline", [function() {
		return {
			restrict: "A",
			scope: {
				data: "=",
				options: "="
			},
			link: function(scope, ele) {
				var data, options, sparkResize, sparklineDraw;
				return data = scope.data, options = scope.options, sparkResize = void 0, sparklineDraw = function() {
					return ele.sparkline(data, options)
				}, $(window).resize(function() {
					return clearTimeout(sparkResize), sparkResize = setTimeout(sparklineDraw, 200)
				}), sparklineDraw()
			}
		}
	}]).directive("morrisChart", [function() {
		return {
			restrict: "A",
			scope: {
				data: "="
			},
			link: function(scope, ele, attrs) {
				var colors, data, func, options;
				switch (data = scope.data, attrs.type) {
					case "line":
						return colors = void 0 === attrs.lineColors || "" === attrs.lineColors ? null : JSON.parse(attrs.lineColors), options = {
							element: ele[0],
							data: data,
							xkey: attrs.xkey,
							ykeys: JSON.parse(attrs.ykeys),
							labels: JSON.parse(attrs.labels),
							lineWidth: attrs.lineWidth || 2,
							lineColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
							resize: !0
						}, new Morris.Line(options);
					case "area":
						return colors = void 0 === attrs.lineColors || "" === attrs.lineColors ? null : JSON.parse(attrs.lineColors), options = {
							element: ele[0],
							data: data,
							xkey: attrs.xkey,
							ykeys: JSON.parse(attrs.ykeys),
							labels: JSON.parse(attrs.labels),
							lineWidth: attrs.lineWidth || 2,
							lineColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
							behaveLikeLine: attrs.behaveLikeLine || !1,
							fillOpacity: attrs.fillOpacity || "auto",
							pointSize: attrs.pointSize || 4,
							resize: !0
						}, new Morris.Area(options);
					case "bar":
						return colors = void 0 === attrs.barColors || "" === attrs.barColors ? null : JSON.parse(attrs.barColors), options = {
							element: ele[0],
							data: data,
							xkey: attrs.xkey,
							ykeys: JSON.parse(attrs.ykeys),
							labels: JSON.parse(attrs.labels),
							barColors: colors || ["#0b62a4", "#7a92a3", "#4da74d", "#afd8f8", "#edc240", "#cb4b4b", "#9440ed"],
							stacked: attrs.stacked || null,
							resize: !0
						}, new Morris.Bar(options);
					case "donut":
						return colors = void 0 === attrs.colors || "" === attrs.colors ? null : JSON.parse(attrs.colors), options = {
							element: ele[0],
							data: data,
							colors: colors || ["#0B62A4", "#3980B5", "#679DC6", "#95BBD7", "#B0CCE1", "#095791", "#095085", "#083E67", "#052C48", "#042135"],
							resize: !0
						}, attrs.formatter && (func = new Function("y", "data", attrs.formatter), options.formatter = func), new Morris.Donut(options)
				}
			}
		}
	}])
}).call(this),
function() {
	angular.module("app.ui.form.directives", []).directive("uiRangeSlider", [function() {
		return {
			restrict: "A",
			link: function(scope, ele) {
				return ele.slider()
			}
		}
	}]).directive("uiFileUpload", [function() {
		return {
			restrict: "A",
			link: function(scope, ele) {
				return ele.bootstrapFileInput()
			}
		}
	}]).directive("uiSpinner", [function() {
		return {
			restrict: "A",
			compile: function(ele) {
				return ele.addClass("ui-spinner"), {
					post: function() {
						return ele.spinner()
					}
				}
			}
		}
	}]).directive("uiWizardForm", [function() {
		return {
			link: function(scope, ele) {
				return ele.steps()
			}
		}
	}])
}.call(this),
function() {
	angular.module("app.directives", []).directive("imgHolder", [function() {
		return {
			restrict: "A",
			link: function(scope, ele) {
				return Holder.run({
					images: ele[0]
				})
			}
		}
	}]).directive("customBackground", function() {
		return {
			restrict: "A",
			controller: ["$scope", "$element", "$location", function($scope, $element, $location) {
				var addBg, path;
				return path = function() {
					return $location.path()
				}, addBg = function(path) {
					switch ($element.removeClass("body-home body-special body-tasks"), path) {
						case "/":
							return $element.addClass("body-home");
						case "/404":
						case "/pages/500":
						case "/pages/signin":
						case "/pages/signup":
						case "/login":
						case "/signup":
							return $element.addClass("body-special");
						case "/tasks":
							return $element.addClass("body-tasks")
					}
				}, addBg($location.path()), $scope.$watch(path, function(newVal, oldVal) {
					return addBg($location.path());
					// return newVal !== oldVal ? addBg($location.path()) : void 0
				})
			}]
		}
	}).directive("uiColorSwitch", [function() {
		return {
			restrict: "A",
			link: function(scope, ele) {
				return ele.find(".color-option").on("click", function(event) {
					var $this, hrefUrl, style;
					if ($this = $(this), hrefUrl = void 0, style = $this.data("style"), "loulou" === style) hrefUrl = "styles/main.css", $('link[href^="styles/main"]').attr("href", hrefUrl);
					else {
						if (!style) return !1;
						style = "-" + style, hrefUrl = "styles/main" + style + ".css", $('link[href^="styles/main"]').attr("href", hrefUrl)
					}
					return event.preventDefault()
				})
			}
		}
	}]).directive("collapseNav", [function() {
		return {
			restrict: "A",
			compile: function(ele) {
				var $a, $aRest, $lists, $listsRest;
				return $lists = ele.find("ul").parent("li"), $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>'), $a = $lists.children("a"), $listsRest = ele.children("li").not($lists), $aRest = $listsRest.children("a"), $a.on("click", function(event) {
					var $parent, $this;
					return $this = $(this), $parent = $this.parent("li"), $lists.not($parent).removeClass("open").find("ul").slideUp(), $parent.toggleClass("open").find("ul").slideToggle(), event.preventDefault()
				}), $aRest.on("click", function() {
					return $lists.removeClass("open").find("ul").slideUp()
				})
			}
		}
	}]).directive("highlightActive", [function() {
		return {
			restrict: "A",
			controller: ["$scope", "$element", "$attrs", "$location", function($scope, $element, $attrs, $location) {
				var highlightActive, links, path;
				return links = $element.find("a"), path = function() {
					return $location.path()
				}, highlightActive = function(links, path) {
					return path = "#" + path, angular.forEach(links, function(link) {
						var $li, $link, href;
						return $link = angular.element(link), $li = $link.parent("li"), href = $link.attr("href"), $li.hasClass("active") && $li.removeClass("active"), 0 === path.indexOf(href) ? $li.addClass("active") : void 0
					})
				}, highlightActive(links, $location.path()), $scope.$watch(path, function(newVal, oldVal) {
					return newVal !== oldVal ? highlightActive(links, $location.path()) : void 0
				})
			}]
		}
	}]).directive("toggleOffCanvas", [function() {
		return {
			restrict: "A",
			link: function(scope, ele) {
				return ele.on("click", function() {
					return $("#app").toggleClass("on-canvas")
				})
			}
		}
	}]).directive("slimScroll", [function() {
		return {
			restrict: "A",
			link: function(scope, ele) {
				return ele.slimScroll({
					height: "100%"
				})
			}
		}
	}]).directive("goBack", [function() {
		return {
			restrict: "A",
			controller: ["$scope", "$element", "$window", function($scope, $element, $window) {
				return $element.on("click", function() {
					return $window.history.back()
				})
			}]
		}
	}])
}.call(this),
function() {
	"use strict";
	angular.module("app.form.validation", []).directive("validateEquals", [function() {
		return {
			require: "ngModel",
			link: function(scope, ele, attrs, ngModelCtrl) {
				var validateEqual;
				return validateEqual = function(value) {
					var valid;
					return valid = value === scope.$eval(attrs.validateEquals), ngModelCtrl.$setValidity("equal", valid), "function" == typeof valid ? valid({
						value: void 0
					}) : void 0
				}, ngModelCtrl.$parsers.push(validateEqual), ngModelCtrl.$formatters.push(validateEqual), scope.$watch(attrs.validateEquals, function(newValue, oldValue) {
					return newValue !== oldValue ? ngModelCtrl.$setViewValue(ngModelCtrl.$ViewValue) : void 0
				})
			}
		}
	}])
}.call(this)
