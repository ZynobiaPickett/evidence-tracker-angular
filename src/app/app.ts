import { Component } from '@angular/core';
import { CasesComponent } from './pages/cases/cases';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CasesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}