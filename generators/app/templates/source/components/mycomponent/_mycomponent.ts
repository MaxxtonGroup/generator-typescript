import {Component} from "angular2/core";

@Component({
  selector: 'my-component',
  templateUrl: 'mycomponent.tpl.html'
})
export class MyComponent {
  name: string = "Harry Potter";
}