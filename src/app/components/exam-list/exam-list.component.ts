import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { ExamDTO } from 'src/app/shared/models/exam.model';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
  exams: ExamDTO[] = [];

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.examService.getAllExams().subscribe({
      next: (data) => {
        this.exams = data;
      },
      error: (err) => {
        console.error('Error fetching exams:', err);
      }
    });
  }

  editExam(id: number): void {
    console.log(`Edit exam with ID: ${id}`);
    // Implement navigation or editing logic here
  }

  deleteExam(id: number): void {
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(id).subscribe({
        next: () => {
          console.log(`Deleted exam with ID: ${id}`);
          this.loadExams(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting exam:', err);
        }
      });
    }
  }
}
