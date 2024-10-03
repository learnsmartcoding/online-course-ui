import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-data-binding',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-binding.component.html',
  styleUrl: './data-binding.component.css'
})
export class DataBindingComponent {
  // Interpolation examples
  firstName: string = 'Learn';
  lastName: string = 'Smart Coding';
  itemCount: number = 10;
  price: number = 50;
  quantity: number = 3;

  // Property binding examples
  isDisabled: boolean = true;
  imageUrl: string = 'https://smartlearnbykarthik.azurewebsites.net/assets/skills/4.png';
  isActive: boolean = true;

  
  // Event binding examples
  clickMessage: string = '';
  inputMessage: string = '';
  message: string = '';

  // Two-way binding examples
  username: string = 'Learn Smart Coding';
  isChecked: boolean = true;
  selectedOption: string = 'option1';

  // Event Handlers
  handleClick() {
    this.clickMessage = 'Button clicked!';
  }

  onInput(event: any) {
    this.inputMessage = event.target.value;
  }

  onMouseOver() {
    this.message = 'Mouse is over!';
  }
  onMouseLeave(){
    this.message = 'Mouse left the element!';
  }
}