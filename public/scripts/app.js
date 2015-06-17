;(function() {
	'use strict';
	angular.module('app', ['ngRoute','app.form.validation', 'ngAnimate', 'ui.bootstrap', 'easypiechart', 'mgo-angular-wizard', 'app.ui.services', 'app.controllers', 'app.directives', 'app.ui.form.directives', 'app.task', 'app.localization', 'app.chart.directives']).config(['$routeProvider', function($routeProvider) {
		return $routeProvider.when('/', {
			redirectTo: '/dashboard'
		}).when('/dashboard', {
			templateUrl: 'views/dashboard.html'
		}).when('/test', {
			templateUrl: 'views/forms/validation.html'
		}).when('/professors', {
			templateUrl: 'views/professors/view.html',
			controller: 'ViewProfessorsCtrl'
		}).when('/professors/create', {
			templateUrl: 'views/professors/form.html',
			controller: 'CreateProfessorCtrl'
		}).when('/professors/edit', {
			templateUrl: 'views/professors/form.html',
			controller: 'CreateProfessorCtrl'
		}).when('/students', {
			templateUrl: 'views/students/view.html',
			controller: 'ViewStudentsCtrl'
		}).when('/students/create', {
			templateUrl: 'views/students/form.html',
			controller: 'CreateStudentCtrl'
		}).when('/students/edit', {
			templateUrl: 'views/students/form.html',
			controller: 'CreateStudentCtrl'
		}).when('/quizzes', {
			templateUrl: 'views/quizzes/view.html',
			controller: 'ViewQuizzesCtrl'
		}).when('/quizzes/create', {
			templateUrl: 'views/quizzes/form.html',
			controller: 'CreateQuizCtrl'
		}).when('/quizzes/edit', {
			templateUrl: 'views/quizzes/form.html',
			controller: 'CreateQuizCtrl'
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
