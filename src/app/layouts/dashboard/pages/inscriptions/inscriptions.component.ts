import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from './models';
import { InscriptionsService } from './inscriptions.service';


@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {
  loading$: Observable<boolean>;
  error$: Observable<any>;
  inscriptions$: Observable<Inscription[]>;

  constructor(private inscriptionsService: InscriptionsService) {
    this.loading$ = this.inscriptionsService.loading$;
    this.error$ = this.inscriptionsService.error$;
    this.inscriptions$ = this.inscriptionsService.inscriptions$;
  }
}
