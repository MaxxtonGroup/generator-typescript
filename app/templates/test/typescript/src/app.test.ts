/// <reference path="../typings/karma/karma" />
/// <reference path="../typings/mocha/mocha" />
/// <reference path="../typings/sinon-chai/sinon-chai" />
/// <reference path="../typings/app/app.d.ts" />
<% if (isAngular) { %>
/// <reference path="../typings/angularjs/angular" />
/// <reference path="../typings/angularjs/angular-mocks" />
<% } %>

'use strict';
<% if (isAngular) { %>
beforeEach(angular.mock.module('<%= packageName %>'));
<% } %>
describe('<%= packageName %>.<%= hcBaseName %>', () => {
	it("test function", function(){
		var test: boolean = true;
		chai.expect(test).to.equal(true);
	})
});