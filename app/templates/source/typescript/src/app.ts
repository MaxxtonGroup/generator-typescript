<% if (isApp) { %>
<% if (isAngular) { %>
/// <reference path="../typings/angular/angular.d.ts" />
	
module <%= packageName %> {
	'use strict';
	angular.module('<%= hcBaseName %>', [])
		.config([function(){
			
		}])
		.run([function(){
			
		}]);
}
	
<% } else { %>
module <%= packageName %> {
	'use strict';
	
}
<% } %>
<% } else { %>
module <%= packageName %> {
	'use strict';
	
	export interface I<%= hcBaseName %> {
		
	}
	
	class <%= hcBaseName %> implements I<%= hcBaseName %> {
		
	}
	
}
<% } %>