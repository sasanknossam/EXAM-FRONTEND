import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentDTO } from '../shared/models/student.model';

export interface Student {
  id?: number;
  pin: string;
  name: string;
  branch: string;
  semester: number;
  collegeCode: string;
  year: number;
}


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiBaseUrl="http://localhost:8080/api";
  private apiUrl = `${this.apiBaseUrl}/students`;

  constructor(private http: HttpClient) {}

  registerStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, student);
  }

  getStudentByPin(pin: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${pin}`);
  }

  // Get all students
  getAllStudents(): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(this.apiUrl);
  }
   // Update student details
   updateStudent(pin: string, student: StudentDTO): Observable<StudentDTO> {
    return this.http.put<StudentDTO>(`${this.apiUrl}/${pin}`, student);
  }

  // Delete student
  deleteStudent(pin: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${pin}`);
  }
  getStudentsByExam(examId: number): Observable<StudentDTO[]> {
    return this.http.get<StudentDTO[]>(`${this.apiBaseUrl}/students/exam/${examId}`);
  }
  
}
