 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeatingArrangementDTO } from '../shared/models/SeatingArrangementDTO';

@Injectable({
  providedIn: 'root'
})
export class SeatingService {
  private baseUrl = 'http://localhost:8080/api/seating-arrangements';
  private roomBaseUrl = 'http://localhost:8080/api/rooms';
  private examBaseUrl = 'http://localhost:8080/api/exams';
  // Base URL for all seating-related API requests

  constructor(private http: HttpClient) {}
  autoAssignSeats(examId: number, roomId: number): Observable<SeatingArrangementDTO[]> {
    return this.http.post<SeatingArrangementDTO[]>(
      `${this.baseUrl}/auto-assign?examIds=${examId}&roomId=${roomId}`,
      {}
    );
  }
  
  
  autoAssignByExam(examId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/auto-assign/${examId}`, {});
  }
  
  // Auto-assign students to rooms based on examId and roomId
 // autoAssignByExam(examId: number, roomId: number): Observable<SeatingArrangementDTO[]> {
   // return this.http.post<SeatingArrangementDTO[]>(`${this.baseUrl}/auto-assign`, { examId, roomId });
  //}

  // Assign a seat to a student based on studentId and roomId
  assignSeat(studentId: number, roomId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/assign-seat`, { studentId, roomId });
  }

  // Export seating arrangement to Excel file
  // exportSeatingToExcel(arrangements: SeatingArrangementDTO[]): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/export`, arrangements, { responseType: 'blob' });
  // }
exportSeatingToExcel(roomId: number, examId: number): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/export?roomId=${roomId}&examId=${examId}`, {
    responseType: 'blob'
  });
}
// Updated service method to use subjectCode instead of examId
// exportSeatingToExcel(roomId: number, subjectCode: string): Observable<Blob> {
//   return this.http.get(`${this.baseUrl}/export?roomId=${roomId}&subjectCode=${subjectCode}`, {
//     responseType: 'blob'
//   });
// }

  // // Get all rooms (optional, based on your existing methods)
  // getAllRooms(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/rooms`);
  // }

  // // Get all exams (optional, based on your existing methods)
  // getAllExams(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/exams`);
  // }
  getAllRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.roomBaseUrl);
  }

  // Get all exams
  getAllExams(): Observable<any[]> {
    return this.http.get<any[]>(this.examBaseUrl);
  }
  // Get seating arrangement by exam ID (optional, based on your existing methods)
  getSeatingByExam(examId: number): Observable<SeatingArrangementDTO[]> {
    return this.http.get<SeatingArrangementDTO[]>(`${this.baseUrl}/exam/${examId}`);
  }

  // Get seating arrangement by room ID (optional, based on your existing methods)
  getSeatingByRoom(roomId: number): Observable<SeatingArrangementDTO[]> {
    return this.http.get<SeatingArrangementDTO[]>(`${this.baseUrl}/room/${roomId}`);
  }

  // Get a summary of room and exam seating (optional, based on your existing methods)
  getRoomExamSummary(roomId: number, examId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/summary/room/${roomId}/exam/${examId}`);
  }
  getStudentsByExam(examId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/students/exam/${examId}`);
  }
  // Update seat info (called after modify, add, delete)
updateSeat(pin: string, seatNumber: string, roomId: number, examId: number): Observable<any> {
  return this.http.put(`${this.baseUrl}/update-seat`, {
    pin, seatNumber, roomId, examId
  });
}

}
