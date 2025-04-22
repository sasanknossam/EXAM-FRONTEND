import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService, Student } from 'src/app/services/student.service'; // Import the service
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = ''; // Variable to display error messages

  // Dropdown options
  branches: string[] = ['CSE', 'ECE', 'MECH', 'EEE', 'CIVIL'];
  years: number[] = [1, 2, 3];
  semesters: number[] = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService, // Inject the service
    private router: Router // Inject Router for navigation after registration
  ) {
    // Define the reactive form with fields and validations
    this.registerForm = this.fb.group({
      pin: ['', [Validators.required,  Validators.pattern('^\\d{5}-(C|M|CM|EC|EE)-\\d{3}$')]], // Example: 22022-CM-045
      name: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required], // Dropdown, no pattern needed
      collegeCode: ['', Validators.required],
      year: ['', Validators.required], // Dropdown, no pattern needed
      dob: ['', Validators.required],
    });
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const student: Student = this.registerForm.value; // Extract form data
      this.studentService.registerStudent(student).subscribe(
        (response) => {
          // Show success alert and navigate to login
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You have been registered successfully!',
          //   confirmButtonText: 'Go to Login',
          // }).then(() => {
          //   this.router.navigate(['/login']);
           });
        },
        (error) => {
          // Handle errors from the backend
          if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: 'PIN already exists. Please use a different PIN.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: 'An unexpected error occurred. Please try again later.',
            });
          }
        }
      );
    }
  
    
  }
}
