import {Component, View} from 'angular2/angular2';

@Component({
  selector: 'my-component'
})
@View({
  templateUrl: 'mycomponent.tpl.html'
})
export class MyComponent{
  text: string = "Peter";
}