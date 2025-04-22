import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/app/services/exam.service';
import { ExamDTO } from 'src/app/shared/models/exam.model';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  exam: ExamDTO = new ExamDTO(); // Initialize the exam model
  exams: ExamDTO[] = [];

  constructor(private examService: ExamService,private router:Router) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.examService.getAllExams().subscribe(
      (data) => {
        this.exams = data;
      },
      (error) => {
        console.error('Error loading exams:', error);
      }
    );
  }

  saveExam(): void {
    if (this.exam.examDate) {
      this.examService.createExam(this.exam).subscribe(
        (data) => {
          this.exams.push(data); // Add new exam to the list
          this.exam = new ExamDTO(); // Reset exam model
        },
        (error) => {
          console.error('Error saving exam:', error);
        }
      );
    }
  }

  deleteExam(id: number): void {
    this.examService.deleteExam(id).subscribe(
      () => {
        this.exams = this.exams.filter((exam) => exam.id !== id); // Remove the deleted exam
      },
      (error) => {
        console.error('Error deleting exam:', error);
      }
    );
  }
  goToDashboard(){
    this.router.navigate(['/admin-dashboard']);
  }
}
