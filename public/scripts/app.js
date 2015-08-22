;(function() {
	'use strict';
	angular.module('app', ['ngRoute', 'ngAnimate', 'ngSanitize','app.form.validation', 'ui.bootstrap', 'auth.service', 'easypiechart', 'mgo-angular-wizard', 'app.ui.services', 'app.controllers', 'app.directives', 'app.ui.form.directives', 'app.localization', 'app.chart.directives'])
	.config(['$routeProvider', function($routeProvider) {
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
			templateUrl: 'views/professors/createForm.html',
			controller: 'CreateProfessorCtrl'
		}).when('/professors/edit/:id', {
			templateUrl: 'views/professors/editForm.html',
			controller: 'EditProfessorCtrl'
		}).when('/students', {
			templateUrl: 'views/students/view.html',
			controller: 'ViewStudentsCtrl'
		}).when('/students/create', {
			templateUrl: 'views/students/createForm.html',
			controller: 'CreateStudentCtrl'
		}).when('/students/edit/:id', {
			templateUrl: 'views/students/editForm.html',
			controller: 'EditStudentCtrl'
		}).when('/quizzes', {
			templateUrl: 'views/quizzes/view.html',
			controller: 'ViewQuizzesCtrl'
		}).when('/quizzes/create', {
			templateUrl: 'views/quizzes/form.html',
			controller: 'CreateQuizCtrl'
		}).when('/quizzes/answer/:id', {
			templateUrl: 'views/quizzes/answer.html',
			controller: 'AnswerQuizCtrl'
		}).when('/quizzes/submissions/:id', {
			templateUrl: 'views/quizzes/submissions.html',
			controller: 'SubmissionsQuizCtrl'
		}).when('/quizzes/edit', {
			templateUrl: 'views/quizzes/form.html',
			controller: 'CreateQuizCtrl'
		}).when('/questions', {
			templateUrl: 'views/questions/view2.html',
			controller: 'ViewQuestionsCtrl'
		}).when('/questions/create', {
			templateUrl: 'views/questions/form.html',
			controller: 'CreateQuestionCtrl'
		}).when('/questions/answer/:id', {
			templateUrl: 'views/questions/answer.html',
			controller: 'AnswerQuestionCtrl'
		}).when('/questions/submissions/:id', {
			templateUrl: 'views/questions/submissions.html',
			controller: 'SubmissionsQuestionCtrl'
		}).when('/questions/edit/:id', {
			templateUrl: 'views/questions/form.html',
			controller: 'CreateQuestionCtrl'
		}).when('/pages/features', {
			templateUrl: 'views/pages/features.html'
		}).when('/login', {
			templateUrl: 'views/pages/login.html'
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
		}).otherwise({
			redirectTo: '/404'
		})
	}])
}).call(this)
