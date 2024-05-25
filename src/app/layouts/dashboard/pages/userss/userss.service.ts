import { Injectable } from "@angular/core";
import { IUserss } from "./models";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment.development";

@Injectable({ providedIn: 'root'})
export class UserssService {

  constructor(private httpClient: HttpClient) {}

  getUserss(): Observable<IUserss[]> {
    return this.httpClient.get<IUserss[]>(`${environment.baseAPIURL}/users`);
  }

  createUser(payload: IUserss): Observable<IUserss> {
    return this.httpClient.post<IUserss>(`${environment.baseAPIURL}/users`, payload);
  }

  updateUser(id: number, payload: IUserss): Observable<IUserss> {
    return this.httpClient.put<IUserss>(`${environment.baseAPIURL}/users/${id}`, payload);
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.baseAPIURL}/users/${id}`);
  }
}
