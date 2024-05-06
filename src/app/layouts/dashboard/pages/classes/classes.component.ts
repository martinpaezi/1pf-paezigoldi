import { Component, OnInit } from '@angular/core';
import { ClassesService } from './classes.service';
import { IClass } from './models';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})

export class ClassesComponent implements OnInit {
classes: IClass[] = [];
  
  constructor(private classesService: ClassesService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classesService.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: () => {},
      complete: () => {}
    })
  }
}
