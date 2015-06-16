;(function() {
	'use strict';
	angular.module('app', ['ngRoute','app.form.validation', 'ngAnimate', 'ui.bootstrap', 'easypiechart', 'mgo-angular-wizard', 'app.ui.services', 'app.controllers', 'app.directives', 'app.ui.form.directives', 'app.task', 'app.localization', 'app.chart.directives']).config(['$routeProvider', function($routeProvider) {
		return $routeProvider.when('/', {
			redirectTo: '/dashboard'
		}).when('/dashboard', {
			templateUrl: 'views/dashboard.html'
		}).when('/test', {
			templateUrl: 'views/forms/validation.html'
		}).when('/places', {
			templateUrl: 'views/places/view.html'
		}).when('/places/create', {
			templateUrl: 'views/places/form.html'
		}).when('/places/map', {
			templateUrl: 'views/places/viewInMap.html'
		}).when('/clients', {
			templateUrl: 'views/clients/view.html'
		}).when('/clients/create', {
			templateUrl: 'views/clients/form.html'
		}).when('/dealers', {
			templateUrl: 'views/dealers/view.html'
		}).when('/dealers/create', {
			templateUrl: 'views/dealers/form.html'
		}).when('/pages/features', {
			templateUrl: 'views/pages/features.html'
		}).when('/pages/signin', {
			templateUrl: 'views/pages/signin.html'
		}).when('/pages/signup', {
			templateUrl: 'views/pages/signup.html'
		}).when('/pages/profile', {
			templateUrl: 'views/pages/profile.html'
		}).when('/404', {
			templateUrl: 'views/pages/404.html'
		}).when('/pages/500', {
			templateUrl: 'views/pages/500.html'
		}).when('/tasks', {
			templateUrl: 'views/tasks/tasks.html'
		}).otherwise({
			redirectTo: '/404'
		})
	}])
}).call(this)
