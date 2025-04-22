import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { StudentDTO } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: StudentDTO[] = [];
  student: StudentDTO = new StudentDTO();

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  // Method to get all students
  getAllStudents() {
    this.studentService.getAllStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students', error);
      }
    );
  }

  // Method to save new student or update existing student
  saveStudent() {
    if (this.student.pin) {
      // Update student
      this.studentService.updateStudent(this.student.pin, this.student).subscribe(
        () => {
          this.getAllStudents();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating student', error);
        }
      );
    } else {
      // Create new student
      this.studentService.registerStudent(this.student).subscribe(
        () => {
          this.getAllStudents();
          this.resetForm();
        },
        (error) => {
          console.error('Error registering student', error);
        }
      );
    }
  }

  // Method to delete student
  deleteStudent(pin: string) {
    this.studentService.deleteStudent(pin).subscribe(
      () => {
        this.getAllStudents();
      },
      (error) => {
        console.error('Error deleting student', error);
      }
    );
  }

  // Method to reset form fields
  resetForm() {
    this.student = new StudentDTO();
  }

  // Method to populate student data for editing
  editStudent(student: StudentDTO) {
    this.student = { ...student };
  }
  goToDashboard(){
    this.router.navigate(['/admin-dashboard']);
  }
}
