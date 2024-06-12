import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../core/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleService){}

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.setTitle('Inicio');
    });
  }
}
