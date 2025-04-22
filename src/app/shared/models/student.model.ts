export class StudentDTO {
    id: number = 0;
    pin: string = '';
    name: string = '';
    branch: string = '';
    semester: string = '';
    collegeCode: string = '';
    year: string = '';
    dob: string = '';

    constructor(init?: Partial<StudentDTO>) {
        Object.assign(this, init);
      }
  }