//# EXTERNAL MODULES #//
///<reference path='../definitions/karma/karma.d.ts' />
///<reference path='../definitions/mocha/mocha.d.ts' />
///<reference path="../definitions/sinon-chai/sinon-chai.d.ts" />
///<reference path='../definitions/angularjs/angular.d.ts' />
///<reference path='../definitions/angularjs/angular-mocks.d.ts' />

'use strict';

beforeEach(angular.mock.module('<%= packagename %>'));

describe('<%= packagename %>.<%= projectname %>', () => {
	it("test function", function(){
		var test: boolean = true;
		chai.expect(test).to.equal(true);
	})
});