// room.model.ts
export class Room {
    id:number=0;
    roomNumber: string = '';
    capacity: number = 0;
  
    constructor(init?: Partial<Room>) {
      Object.assign(this, init);
    }
  }
  