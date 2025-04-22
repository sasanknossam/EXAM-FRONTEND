// exam.model.ts
export class ExamDTO {
    id: number = 0;
    examDate: string = '';
    semester: string = '';
    branch: string = '';
    subjectCode: string = '';
    year: string = '';
  
    constructor(init?: Partial<ExamDTO>) {
      Object.assign(this, init);
    }
  }
  