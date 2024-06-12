import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ICreateInscriptionPayload, IInscription, ICourse, IStudent } from './models';

@Injectable({ providedIn: 'root' })
export class InscriptionsService {
  constructor(private httpClient: HttpClient) {}

  getInscriptions(): Observable<IInscription[]> {
    return this.httpClient.get<IInscription[]>(
      `${environment.baseAPIURL}/inscriptions?_embed=student&_embed=course`
    );
  }

  getInscriptionsByUserId(sid: string): Observable<IInscription[]> {
    return this.httpClient.get<IInscription[]>(
      `${environment.baseAPIURL}/inscriptions?studentId=${sid}&_embed=course`
    );
  }

  createInscriptions(data: ICreateInscriptionPayload): Observable<IInscription> {
    return this.httpClient.post<IInscription>(`${environment.baseAPIURL}/inscriptions`, data);
  }

  updateInscription(id: number, data: IInscription): Observable<IInscription> {
    return this.httpClient.put<IInscription>(`${environment.baseAPIURL}/inscriptions/${id}`, data);
  }

  deleteInscriptionById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/inscriptions/${id}`);
  }
  
}
