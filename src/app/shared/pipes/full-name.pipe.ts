import { Pipe, PipeTransform } from '@angular/core';
import { IStudents } from '../../layouts/dashboard/pages/students/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(student: IStudents): string {
    return `${student.firstName} ${student.lastName}`;
  }

}
