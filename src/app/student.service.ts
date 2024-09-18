import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://localhost:7125/api/students'; // API URL

  constructor(private http: HttpClient) { }

  getStudents(search: string = '', filter: string = ''): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?search=${search}&filter=${filter}`);
  }
  addStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Add-student`, studentData);
  }
  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-subjects`); // Fetch list of subjects
  }
  deleteStudent(studentKey: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete-student/${studentKey}`);
  }
  editStudent(studentData: any,StudentKey:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update-student/${StudentKey}`, studentData);
  }
}
