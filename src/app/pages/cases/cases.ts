import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaseService, Case } from '../../services/case';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cases.html',
  styleUrl: './cases.css'
})
export class CasesComponent implements OnInit {

  // Component state: stores case data returned from the service/API
  // The HTML template uses this array to display cases on the UI
  cases: Case[] = [];

  // Stores the user’s search input for filtering visible cases
  searchTerm = '';

  // Form model: holds the values entered by the user before creating a new case
  newCase: Case = {
    title: '',
    description: '',
    status: 'OPEN',
    createdDate: new Date().toISOString().split('T')[0]
  };

  // Injects CaseService so the component can request data without calling the API directly
  constructor(private caseService: CaseService) {}

  // Lifecycle hook: runs when the component loads
  // Starts the initial data flow by loading cases from the backend
  ngOnInit(): void {
    this.loadCases();
  }

  // Filters cases on the component side based on search input
  // This does not call the API; it only filters the data already stored in this.cases
  get filteredCases(): Case[] {
    return this.cases.filter(caseItem =>
      caseItem.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      caseItem.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  /**
   * READ operation
   * Flow: Component → Service → API → Database → Service → Component → UI
   * The service retrieves cases, then the component stores them in this.cases.
   */
  loadCases() {
    this.caseService.getCases().subscribe((data: Case[]) => {
      this.cases = data; // Updating component state refreshes the UI through Angular data binding
    });
  }

  /**
   * CREATE operation
   * Sends the new case object to the service.
   * After the API saves it, reloads the case list so the UI shows the latest data.
   */
addCase(): void {
  this.caseService.addCase(this.newCase).subscribe(() => {
    // Reload cases after successful API call so the UI updates
    this.loadCases();

    // Reset form fields after adding a case
    this.newCase = {
      title: '',
      description: '',
      status: 'OPEN',
      createdDate: new Date().toISOString().split('T')[0]
    };
  });
}

  /**
   * DELETE operation
   * Sends the selected case ID to the service.
   * After deletion, reloads cases so the UI matches the database.
   */
  deleteCase(id: string | undefined) {
    if (!id) return;

    this.caseService.deleteCase(id).subscribe(() => {
    // BUG FIX: The UI didn't update when I deleted a case
    // Reload data to ensure UI stays in sync with backend state
      this.loadCases();
    });
  }
}
