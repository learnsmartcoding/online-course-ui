import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../../directives/highlight.directive';

@Component({
  selector: 'app-directives-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, HighlightDirective],
  templateUrl: './directives-demo.component.html',
  styleUrl: './directives-demo.component.css'
})
export class DirectivesDemoComponent {
// Structural Directives Examples
showContent: boolean = true;
items: string[] = ['Angular', 'React', 'Vue', 'Svelte'];
selectedColor: string = 'red';

// Attribute Directives Examples
isActive: boolean = true;
isHighlighted: boolean = false;
}
