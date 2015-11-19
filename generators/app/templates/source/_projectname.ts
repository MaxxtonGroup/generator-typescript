import {bootstrap, Component, View} from 'angular2/angular2';
import {MyComponent} from "./components/mycomponent/mycomponent";

@Component({
  selector: '<%= projectName %>'
})
@View({
  directives: [MyComponent],
  templateUrl: '<%= projectName %>.tpl.html'
})
class <%= className %>{}

bootstrap(<%= className %>, []);
