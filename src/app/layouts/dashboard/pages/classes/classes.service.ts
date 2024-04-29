import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { IClass } from "./models";

const CLASSES_DB: IClass[] = [
  {
    id:1,
    course: 'Javascript',
    students: 45,
  },
  {
    id:2,
    course: 'React',
    students: 21,
  },
  {
    id:3,
    course: 'Angular',
    students: 23,
  },
  {
    id:4,
    course: 'Vue',
    students: 11,
  },
]

@Injectable({ providedIn: 'root' })
export class ClassesService {

  constructor(){}

  getClasses(): Observable<IClass[]> {
    return of(CLASSES_DB);
  }

  createClasses(data: IClass) {
    CLASSES_DB.push(data);
    return of(CLASSES_DB);
  }


  deleteClasses(id: number) {
    return of(CLASSES_DB.filter((clas) => clas.id != id))
  }

  updateClasses(id: number, data: IClass) {
    return of(CLASSES_DB.map((clas) => (clas.id === id ? {...clas, ...data}: clas) ))
  }

}