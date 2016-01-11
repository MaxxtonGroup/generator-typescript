import {bootstrap} from 'angular2/platform/browser'
import {MyComponent} from './components/mycomponent/mycomponent'
import {Type} from "angular2/core";
import {Component} from "angular2/core";

//For some reason Intellij throws errors if the component does not have in front of it.
@Component({
  selector: '<%= projectName %>',
  directives: [<Type>MyComponent],
  templateUrl: '<%= projectName %>.tpl.html'
})
export class <%= className %>{}

bootstrap(<Type><%= className %>);
