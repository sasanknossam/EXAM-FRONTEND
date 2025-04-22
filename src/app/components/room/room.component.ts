import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/shared/models/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room: Room = new Room(); // Initialize the room model
  rooms: Room[] = [];

  constructor(private roomService: RoomService,private router:Router) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getAllRooms().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        console.error('Error loading rooms:', error);
      }
    );
  }

  saveRoom(): void {
    if (this.room.roomNumber) {
      this.roomService.createRoom(this.room).subscribe(
        (data) => {
          this.rooms.push(data); // Add new room to the list
          this.room = new Room(); // Reset room model
        },
        (error) => {
          console.error('Error saving room:', error);
        }
      );
    }
  }

  deleteRoom(roomNumber: string): void {
    this.roomService.deleteRoom(roomNumber).subscribe(
      () => {
        this.rooms = this.rooms.filter((room) => room.roomNumber !== roomNumber); // Remove the deleted room
      },
      (error) => {
        console.error('Error deleting room:', error);
      }
    );
  }
  goToDashboard(){
    this.router.navigate(['/admin-dashboard']);
  }
}
