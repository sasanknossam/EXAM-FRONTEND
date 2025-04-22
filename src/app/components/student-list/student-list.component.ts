import { Component } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { StudentDTO } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {

  students: StudentDTO[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe((data) => {
      this.students = data;
    });
  }
}
