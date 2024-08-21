import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NavBarComponent } from "./components/core/nav-bar/nav-bar.component";

//A class decorated with 'component' then it becomes a component for angular
// it has these
@Component({
  selector: 'app-root',//this name is used as component selction
  standalone: true, //this is new to angular 16+, if yes, then no ngmodule is used
  imports: [RouterOutlet, HomeComponent, NavBarComponent], // because we choose yes above, import is done on component level. wher eother module si imported
  templateUrl: './app.component.html', //this is the place we point where html is placed for this component
  styleUrl: './app.component.css'// same as html, we point where is css is placed
})
export class AppComponent {
  title = 'online-course-ui'; // just a variable in compoennt and we will see more on these
}
