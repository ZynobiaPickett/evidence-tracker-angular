import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Case {
  id?: string;
  title: string;
  description: string;
  status: string;
  createdDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = 'http://localhost:3000/cases';

  constructor(private http: HttpClient) {}

  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(this.apiUrl);
  }

  addCase(newCase: Case): Observable<Case> {
    return this.http.post<Case>(this.apiUrl, newCase);
  }

  deleteCase(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
}