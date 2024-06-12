import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { InscriptionsService } from './inscriptions.service';
import { IInscription, ICourse, IStudent } from './models';
import { Store } from '@ngrx/store';
import { selectIsLoading, selectInscription, selectInscriptionError } from './store/inscription.selectors';
import { InscriptionActions } from './store/inscription.actions';
import Swal from 'sweetalert2';
import { TitleService } from '../../../../core/services/title.service';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsDialogComponent } from './components/inscriptions-dialog/inscriptions-dialog.component';
import { IUserss } from '../userss/models';
import { Router } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})

export class InscriptionsComponent implements OnInit {
  dataSource = new MatTableDataSource<IInscription>([]);
  displayedColumns = ['id', 'course', 'student', 'date', 'actions'];
  loading$: Observable<boolean>;
  error$: Observable<unknown>;
  inscriptions$: Observable<IInscription[]>;
  currentUser: IUserss | null = null;

  constructor(
    private inscriptionsService: InscriptionsService,
    private usersService: UsersService,
    private router: Router,
    private matDialog: MatDialog,
    private store: Store,
    private titleService: TitleService
  ) {
    this.loading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectInscriptionError);
    this.inscriptions$ = this.store.select(selectInscription);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.titleService.setTitle('Inscripciones');
    });
    this.store.dispatch(InscriptionActions.loadInscriptions());
    this.inscriptions$.subscribe((inscriptions) => {
      this.dataSource.data = inscriptions;
    });
    this.currentUser = this.usersService.getAuthenticatedUser();
    if (!this.currentUser) {
      this.router.navigate(['/auth']);
    }
    this.error$.subscribe((error) => {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });
  }

  openDialog(editingInscription?: IInscription): void {
    const dialogRef = this.matDialog.open(InscriptionsDialogComponent, {
      data: editingInscription ? { ...editingInscription } : null,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (editingInscription) {
          result.date = editingInscription.date;
          if (editingInscription.id !== undefined) {
            this.updateInscription(editingInscription.id, result);
          }
        } else {
          this.createInscription(result);
        }
      }
    });
  }

  createInscription(inscription: IInscription): void {
    inscription.date = new Date().toISOString();
    this.store.dispatch(InscriptionActions.createInscription({ payload: inscription }));
  }

  updateInscription(id: number, inscription: IInscription): void {
    this.store.dispatch(InscriptionActions.updateInscription({ id, payload: inscription }));
  }

  onDelete(id: number): void {
    Swal.fire({
      icon: 'question',
      text: 'Está seguro?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(InscriptionActions.deleteInscriptionById({ id: id.toString() }));
      }
    });
  }
  
}
