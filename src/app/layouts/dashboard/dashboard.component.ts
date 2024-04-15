import { Component } from '@angular/core';
// import {MatButtonModule} from '@angular/material/button';
// import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  // standalone: true,
  // imports: [MatSidenavModule, MatButtonModule],
})
export class DashboardComponent {
  showFiller: boolean = true;

  isMobile(): boolean {
    return window.innerWidth <= 280;
  }
}
