import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { SeatingService } from 'src/app/services/seating.service';
import { RoomExamSummary } from 'src/app/shared/models/RoomExamSummary';
import { SeatingArrangementDTO } from 'src/app/shared/models/SeatingArrangementDTO';
import { ExamDTO } from 'src/app/shared/models/exam.model';
import { Room } from 'src/app/shared/models/room.model';
// import { RoomService } from 'src/app/services/room.service';
// import { Room } from 'src/app/shared/models/room.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  roomId!: number;
  examId!: number;
  seatingArrangements: SeatingArrangementDTO[] = [];
  roomExamSummary: RoomExamSummary | null = null;
  loading = false;
  // rooms: Room[] = [];
  rooms: Room[] = []; // Store room data
exams: ExamDTO[] = []; // Store exam data

  constructor(
    private seatingService: SeatingService, 
    // private roomService: RoomService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.fetchRooms();
    this.fetchExams();
    this.getSeatingByExam(1); 
    this.fetchSeatingArrangements();
    this.getRoomExamSummary(1, 1);
    //this.loadRooms();
  }

  fetchSeatingArrangements(): void {
    this.seatingService.getSeatingByExam(1).subscribe({
      next: (data) => this.seatingArrangements = data,
      error: (err) => console.error('Error fetching seating arrangements:', err)
    });
  }

  getSeatingByExam(examId: number): void {
    this.loading = true;
    this.seatingService.getSeatingByExam(examId).subscribe({
      next: (data) => {
        this.seatingArrangements = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching seating arrangements:', err);
        this.loading = false;
      }
    });
  }

  getRoomExamSummary(roomId: number, examId: number): void {
    this.loading = true;
    this.seatingService.getRoomExamSummary(roomId, examId).subscribe({
      next: (data) => {
        this.roomExamSummary = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching room exam summary:', err);
        this.loading = false;
      }
    });
  }

  // loadRooms(): void {
  //   this.roomService.getAllRooms().subscribe(
  //     (data) => this.rooms = data,
  //     (error) => console.error('Error loading rooms:', error)
  //   );
  // }
  //   navigateToRooms(): void {
  //   this.router.navigate(['/rooms']); // Navigate to RoomComponent
  // }

  onExport(event: Event): void {
    event.preventDefault();
    if (this.roomId && this.examId) {
      this.seatingService.exportSeatingToExcel(this.roomId, this.examId).subscribe;
    } else {
      alert('Please provide both Room ID and Exam ID.');
    }
  }
  // Fetch all rooms
fetchRooms(): void {
  this.seatingService.getAllRooms().subscribe({
    next: (data) => this.rooms = data,
    error: (err) => console.error('Error fetching rooms:', err)
  });
}

// Fetch all exams
fetchExams(): void {
  this.seatingService.getAllExams().subscribe({
    next: (data) => this.exams = data,
    error: (err) => console.error('Error fetching exams:', err)
  });
}

}