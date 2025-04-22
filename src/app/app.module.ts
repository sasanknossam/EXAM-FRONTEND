import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomComponent } from './components/room/room.component';
import { ExamComponent } from './components/exam/exam.component';
import { StudentComponent } from './components/student/student.component';
 import { SeatingArrangementComponent } from './components/seating-arrangement/seating-arrangement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    StudentDashboardComponent,
    StudentListComponent,
    ExamListComponent,
    RoomListComponent,
    RoomComponent,
    ExamComponent,
    StudentComponent,
     SeatingArrangementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, // For template-driven forms
    ReactiveFormsModule,
    HttpClientModule, // For backend API communication
    BrowserAnimationsModule, // Required for Material animations
    MatCardModule, // Material Card
    MatFormFieldModule, // Material Form Field
    MatInputModule, // Material Input
    MatButtonModule, // Material Button
    MatSelectModule, // Material Select Dropdown
    MatToolbarModule, // (Optional) Toolbar if needed
    MatIconModule, // (Optional) Icons if needed
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
