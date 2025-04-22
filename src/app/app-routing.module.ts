import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ExamComponent } from './components/exam/exam.component';
import { RoomComponent } from './components/room/room.component';
import { StudentComponent } from './components/student/student.component';
import { SeatingArrangementComponent } from './components/seating-arrangement/seating-arrangement.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, },
  { path: 'student-dashboard', component: StudentDashboardComponent,canActivate: [AuthGuard] },
  //{ path: 'students', component: StudentListComponent,canActivate: [AuthGuard]},
  { path: 'exam', component: ExamComponent ,canActivate: [AuthGuard]},
  { path: 'room', component: RoomComponent ,canActivate: [AuthGuard]},
  { path: 'student', component: StudentComponent ,canActivate:[AuthGuard] },
  { path: 'seating-arrangement', component: SeatingArrangementComponent,canActivate: [AuthGuard] }, 
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
