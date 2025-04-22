 // import { Component, OnInit } from '@angular/core';
// import { ExamService } from '../../services/exam.service';
// import { StudentService } from '../../services/student.service';
// import { RoomService } from '../../services/room.service';
// import { SeatingService } from '../../services/seating.service';
// import { ExamDTO } from '../../shared/models/exam.model';
// import { StudentDTO } from '../../shared/models/student.model';
// import { Room } from '../../shared/models/room.model';
// import { SeatingArrangementDTO } from '../../shared/models/SeatingArrangementDTO';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-seating-arrangement',
//   templateUrl: './seating-arrangement.component.html',
//   styleUrls: ['./seating-arrangement.component.css']
// })
// export class SeatingArrangementComponent implements OnInit {
//   exams: ExamDTO[] = [];
//   students: StudentDTO[] = [];
//   rooms: Room[] = [];
//   selectedExamId: number | null = null;
//   selectedRoomId: number | null = null;
//   seatingArrangements: SeatingArrangementDTO[] = [];
  

//   constructor(
//     private examService: ExamService,
//     private studentService: StudentService,
//     private roomService: RoomService,
//     private seatingService: SeatingService,
//     private router:Router
//   ) {}

//   ngOnInit(): void {
//     this.loadExams();
//     this.loadStudents();
//     this.loadRooms();
//   }

//   loadExams(): void {
//     this.examService.getAllExams().subscribe((data: ExamDTO[]) => {
//       this.exams = data;
//     });
//   }

//   loadStudents(): void {
//     this.studentService.getAllStudents().subscribe((data: StudentDTO[]) => {
//       this.students = data;
//     });
//   }

//   loadRooms(): void {
//     this.roomService.getAllRooms().subscribe((data: Room[]) => {
//       this.rooms = data;
//     });
//   }

//   // assignRoom(studentId: number): void {
//   //   if (this.selectedExamId && this.selectedRoomId) {
//   //     this.seatingService.assignSeat(this.selectedExamId, this.selectedRoomId, studentId)
//   //       .subscribe({
//   //         next: (_response) => {
//   //           console.log(`Student ${studentId} assigned to Room ${this.selectedRoomId} for Exam ${this.selectedExamId}`);
//   //           alert(` Student assigned successfully!`);
//   //         },
//   //         error: (error) => {
//   //           console.error('Error assigning student:', error);
//   //           alert(` Student   assigned`);
//   //         }
//   //       });
//   //   } else {
//   //     console.warn('Please select an exam and a room before assigning a student.');
//   //   }
//   // }
//   assignRoom(studentId: number): void {
//     if (this.selectedExamId && this.selectedRoomId) {
//       this.seatingService.assignSeat(this.selectedExamId, this.selectedRoomId.toString(), studentId)
//         .subscribe({
//           next: () => {
//             console.log(`Student ${studentId} assigned to Room ${this.selectedRoomId} for Exam ${this.selectedExamId}`);
//             alert('Student assigned successfully!');
//             this.router.navigate(['/seating-arrangement']);
//           },
//           error: (error) => {
//             console.error('Error assigning student:', error);
//             alert('Error: Student not assigned.');
//           }
//         });
//     } else {
//       console.warn('Please select an exam and a room before assigning a student.');
//     }
//   }
  

//   loadSeatingArrangements(): void {
//     if (this.selectedExamId) {
//       this.seatingService.getSeatingByExam(this.selectedExamId).subscribe((data) => {
//         this.seatingArrangements = data;
//       });
//     }
//   }

//   exportSeating(): void {
//     if (this.selectedExamId && this.selectedRoomId) {
//       this.seatingService.exportToExcel(this.selectedRoomId, this.selectedExamId);
//     } else {
//       console.warn('Please select an exam and a room before exporting.');
//     }
//   }
  
//   goToDashboard(){
//     this.router.navigate(['/admin-dashboard']);
//   } 
//   menuOpenIndex: number | null = null;
// menuX = 0;
// menuY = 0;

// seats = [
//   { seatNumber: 'A1', pin: '' },
//   { seatNumber: 'A2', pin: '22022-CM-045' },
//   // Add more based on room layout
// ];

// // Open context menu
// openMenu(index: number, event: MouseEvent) {
//   this.menuOpenIndex = index;
//   this.menuX = event.clientX;
//   this.menuY = event.clientY;
// }

// // Add student
// addStudent(index: number) {
//   const pin = prompt('Enter Student PIN');
//   if (pin) this.seats[index].pin = pin;
//   this.closeMenu();
// }

// // Remove student
// removeStudent(index: number) {
//   this.seats[index].pin = '';
//   this.closeMenu();
// }

// // Modify student
// modifyStudent(index: number) {
//   const newPin = prompt('Enter New PIN', this.seats[index].pin);
//   if (newPin) this.seats[index].pin = newPin;
//   this.closeMenu();
// }

// closeMenu() {
//   this.menuOpenIndex = null;
// }
// autoAssignedResults: SeatingArrangementDTO[] = [];

// autoAssignSeats(): void {
//   if (!this.selectedExamId) {
//     alert("Please select an exam.");
//     return;
//   }

//   this.seatingService.autoAssignByExam(this.selectedExamId).subscribe({
//     next: (data: SeatingArrangementDTO[]) => {
//       this.autoAssignedResults = data;
//       alert('Seats auto-assigned successfully!');
//     },
//     error: (err) => {
//       console.error("Auto assignment error:", err);
//       alert("Something went wrong while auto assigning!");
//     }
//   });
// }


// }
import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { StudentService } from '../../services/student.service';
import { RoomService } from '../../services/room.service';
import { SeatingService } from '../../services/seating.service';
import { ExamDTO } from '../../shared/models/exam.model';
import { StudentDTO } from '../../shared/models/student.model';
import { Room } from '../../shared/models/room.model';
import { SeatingArrangementDTO } from '../../shared/models/SeatingArrangementDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seating-arrangement',
  templateUrl: './seating-arrangement.component.html',
  styleUrls: ['./seating-arrangement.component.css']
})
// export class SeatingArrangementComponent implements OnInit {
//   exams: ExamDTO[] = [];
//   students: StudentDTO[] = [];
//   rooms: Room[] = [];
//   seatingArrangements: SeatingArrangementDTO[] = [];
//   selectedExam: ExamDTO | null = null;
//   selectedRoom: Room | null = null;

//   constructor(
//     private examService: ExamService,
//     private studentService: StudentService,
//     private roomService: RoomService,
//     private seatingService: SeatingService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadExams();
//     this.loadRooms();
//   }

//   loadExams(): void {
//     this.examService.getAllExams().subscribe(
//       (exams) => {
//         this.exams = exams;
//       },
//       (error) => {
//         console.error('Error loading exams:', error);
//       }
//     );
//   }

//   loadRooms(): void {
//     this.roomService.getAllRooms().subscribe(
//       (rooms) => {
//         this.rooms = rooms;
//       },
//       (error) => {
//         console.error('Error loading rooms:', error);
//       }
//     );
//   }

//   loadStudentsForExam(): void {
//     if (this.selectedExam) {
//       this.studentService.getStudentsByExam(this.selectedExam.id).subscribe(
//         (students) => {
//           this.students = students;
//         },
//         (error) => {
//           console.error('Error loading students for exam:', error);
//         }
//       );
//     }
//   }

//   autoAssignSeats(): void {
//     if (this.selectedExam && this.selectedRoom) {
//       this.seatingService.autoAssignByExam(this.selectedExam.id).subscribe(
//         (arrangements) => {
//           this.seatingArrangements = arrangements;
//         },
//          (error) => {
//           console.error('Error exporting data to Excel:', error);
//         }
//       );
//     }
//   }
//   goToDashboard(){
//         this.router.navigate(['/admin-dashboard']);
//       } 
//       menuOpenIndex: number | null = null;
//     menuX = 0;
//     menuY = 0;
    
//     seats = [
//       { seatNumber: 'A1', pin: '' },
//       { seatNumber: 'A2', pin: '22022-CM-045' },
//       // Add more based on room layout
//     ];
    
//     // Open context menu
//     openMenu(index: number, event: MouseEvent) {
//       this.menuOpenIndex = index;
//       this.menuX = event.clientX;
//       this.menuY = event.clientY;
//     }
    
//     // Add student
//     addStudent(index: number) {
//       const pin = prompt('Enter Student PIN');
//       if (pin) this.seats[index].pin = pin;
//       this.closeMenu();
//     }
    
//     // Remove student
//     removeStudent(index: number) {
//       this.seats[index].pin = '';
//       this.closeMenu();
//     }
    
//     // Modify student
//     modifyStudent(index: number) {
//       const newPin = prompt('Enter New PIN', this.seats[index].pin);
//       if (newPin) this.seats[index].pin = newPin;
//       this.closeMenu();
//     }
    
//     closeMenu() {
//       this.menuOpenIndex = null;
//     }
//     autoAssignedResults: SeatingArrangementDTO[] = [];
    
//     autoAssignSeats(): void {
//       if (!this.selectedExamId) {
//         alert("Please select an exam.");
//         return;
//       }
    
//       this.seatingService.autoAssignByExam(this.selectedExamId).subscribe({
//         next: (data: SeatingArrangementDTO[]) => {
//           this.autoAssignedResults = data;
//           alert('Seats auto-assigned successfully!');
//         },
//         error: (err) => {
//           console.error("Auto assignment error:", err);
//           alert("Something went wrong while auto assigning!");
//         }
//       });
//     }
    
    
//     }
export class SeatingArrangementComponent implements OnInit {
  exams: ExamDTO[] = [];
  students: StudentDTO[] = [];
  rooms: Room[] = [];
  seatingArrangements: SeatingArrangementDTO[] = [];
  selectedExamId: number | null = null;
  selectedRoomId: number | null = null;
  selectedDate: string = ''; // This binds to exam date
  examsOnDate: ExamDTO[] = []; // To filter exams by date
 // uniqueExamDates: string[] = [];
  menuOpenIndex: number | null = null;
  menuX = 0;
  menuY = 0;

  seats = [
    { seatNumber: 'A1', pin: '' },
    { seatNumber: 'A2', pin: '22022-CM-045' },
    // Add more based on actual room layout
  ];

  constructor(
    private examService: ExamService,
    private studentService: StudentService,
    private roomService: RoomService,
    private seatingService: SeatingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExams();
    this.loadRooms();
  }

  // loadExams(): void {
  //   this.examService.getAllExams().subscribe({
  //     next: (exams) => this.exams = exams,
  //     error: (err) => console.error('Error loading exams:', err)
  //   });
  // }
  loadExams(): void {
    this.examService.getAllExams().subscribe({
      next: (exams) => {
        this.exams = exams;
        this.filterExamsByDate(); // Optional: Automatically filter if a date is already selected
      },
      error: (err) => console.error('Error loading exams:', err)
    });
  }
  
  // ✅ Define this outside of loadExams()
  
  

  loadRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (rooms) => this.rooms = rooms,
      error: (err) => console.error('Error loading rooms:', err)
    });
  }

 loadStudentsForExam(): void {
  this.seatingArrangements = []; // Reset previous preview
  if (this.selectedExamId) {
    this.studentService.getStudentsByExam(this.selectedExamId).subscribe({
      next: (students) => this.students = students,
      error: (err) => console.error('Error loading students:', err)
    });
  }
}


autoAssignSeats(): void {
    if (!this.selectedExamId || !this.selectedRoomId) {
      alert("Please select both exam and room.");
      return;
    }

    this.seatingService.autoAssignSeats(this.selectedExamId, this.selectedRoomId).subscribe({
      next: (data) => {
        this.seatingArrangements = data;
        alert('Seats auto-assigned successfully!');
      },
      error: (err) => {
        console.error("Auto assignment error:", err);
        alert("Something went wrong during auto assignment.");
      }
    });
  }

  exportToExcel(): void {
    if (!this.selectedExamId|| !this.selectedRoomId) {
      alert("Select exam and room to export.");
      return;
    }

    this.seatingService.exportSeatingToExcel(this.selectedRoomId, this.selectedExamId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'SeatingArrangement.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Export error:', err);
        alert('Failed to export seating arrangement.');
      }
    });
  }

  // Context Menu
  openMenu(index: number, event: MouseEvent) {
    this.menuOpenIndex = index;
    this.menuX = event.clientX;
    this.menuY = event.clientY;
  }

  addStudent(index: number) {
    const pin = prompt('Enter Student PIN');
    if (pin) this.seats[index].pin = pin;
    this.closeMenu();
  }

  removeStudent(index: number) {
    this.seats[index].pin = '';
    this.closeMenu();
  }

  modifyStudent(index: number) {
    const newPin = prompt('Enter New PIN', this.seats[index].pin);
    if (newPin) this.seats[index].pin = newPin;
    this.closeMenu();
  }

  closeMenu() {
    this.menuOpenIndex = null;
  }

  goToDashboard() {
    this.router.navigate(['/admin-dashboard']);
  }
  filterExamsByDate(): void {
    this.examsOnDate = this.exams.filter(exam => exam.examDate === this.selectedDate);
  }

  getUniqueExamDates(): string[] {
    const uniqueDates = new Set<string>();
    this.exams.forEach(exam => {
      uniqueDates.add(exam.examDate);
    });
    return Array.from(uniqueDates);
  }
  
  
  calculateSeatNumber(index: number): string {
    return `Seat-${index + 1}`;  // Example: Seat-1, Seat-2, etc.
  }
  
}
