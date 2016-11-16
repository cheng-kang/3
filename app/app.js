'use strict';

/* App Module */

var SBApp = angular.module('SBApp', [
    'ngRoute',
    
    'SBControllers',
]);

SBApp.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'template/home.html',
			controller: 'HomeCtrl'
		}).
		when('/browse/:photoId', {
			templateUrl: 'template/browse.html',
			controller: 'BrowseCtrl'
		}).
		when('/login', {
			templateUrl: 'template/login.html',
			controller: 'LoginCtrl'
		}).
		when('/logout', {
			templateUrl: 'template/logout.html',
			controller: 'LogoutCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
});