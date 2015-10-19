'use strict';

module <%=packagename%> {	
	
	var configure = function(stateProvider: ng.ui.IStateProvider, urlRouterProvider: ng.ui.IUrlRouterProvider): void {
		urlRouterProvider.otherwise("/");
		
		stateProvider
			.state('homepage', {
				url: '/',
				templateUrl: '/templates/home.html'
			});
	};
	
	var execute = function(): void {
		
	};
	
	export var app = angular
		.module('<%= projectname %>', ['ui.router'])
		.config(['$stateProvider', '$urlRouterProvider', configure])
		.run([execute]);
}