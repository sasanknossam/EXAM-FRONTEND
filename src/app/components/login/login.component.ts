import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onRoleChange() {
    const role = this.loginForm.get('role')?.value;
    if (role === 'Student') {
      this.loginForm.get('password')?.setValidators([
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD format for students
      ]);
    } else if (role === 'Admin') {
      this.loginForm.get('password')?.setValidators([Validators.required]);
    }
    this.loginForm.get('password')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password, role } = this.loginForm.value;

      console.log('Form Data:', { username, password, role });

      this.authService.login({ username, password, role }).subscribe({
        next: (response: any) => {
          console.log('Backend Response:', response);

          if (response.message?.toLowerCase().includes('login successful')) {
            localStorage.setItem('token', response.token);  // 🔹 Store token

            const targetRoute = role === 'Admin' ? '/admin-dashboard' : '/student-dashboard';
            if(targetRoute==='/admin-dashboard'){
              Swal.fire("Admin login succesful");
            }
            else{
              Swal.fire("Student login succesful");
            }
           
            console.log('Navigating to:', targetRoute);
            this.router.navigate([targetRoute]);
          } else {
            this.errorMessage = response.message || 'Invalid credentials. Please try again.';
            console.log('Error Message:', this.errorMessage);
          }
        },
        error: (error: any) => {
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred during login. Please try again later.';
        }
      });
    } else {
      console.log('Form Invalid:', this.loginForm.errors);
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
