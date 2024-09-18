import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,StudentsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Test-UI';
}
