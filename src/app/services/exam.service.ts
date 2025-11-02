import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExamDTO } from '../shared/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private apiUrl = 'https://mild-sile-sasanknossam-1168063f.koyeb.app/api/exams';

  constructor(private http: HttpClient) { }

  // Get all exams
  getAllExams(): Observable<ExamDTO[]> {
    return this.http.get<ExamDTO[]>(this.apiUrl);
  }

  // Get exam by ID
  getExamById(id: number): Observable<ExamDTO> {
    return this.http.get<ExamDTO>(`${this.apiUrl}/${id}`);
  }

  // Create a new exam
  createExam(exam: ExamDTO): Observable<ExamDTO> {
    return this.http.post<ExamDTO>(this.apiUrl, exam);
  }

  // Update exam details
  updateExam(id: number, exam: ExamDTO): Observable<ExamDTO> {
    return this.http.put<ExamDTO>(`${this.apiUrl}/${id}`, exam);
  }

  // Delete exam
  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
