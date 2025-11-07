import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../shared/models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'mild-sile-sasanknossam-1168063f.koyeb.app/api/rooms';

  constructor(private http: HttpClient) { }

  // Get all rooms
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  // Get room by number
  getRoomByNumber(roomNumber: string): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${roomNumber}`);
  }

  // Create a new room
  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  // Update room details
  updateRoom(roomNumber: string, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${roomNumber}`, room);
  }

  // Delete room
  deleteRoom(roomNumber: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${roomNumber}`);
  }
}
