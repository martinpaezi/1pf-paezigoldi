import { Injectable } from "@angular/core";
import { IUserss, ICreateUserPayload } from "./models";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment.development";

@Injectable({ providedIn: 'root'})
export class UserssService {

  constructor(private httpClient: HttpClient) {}

  getUserss(): Observable<IUserss[]> {
    return this.httpClient.get<IUserss[]>(environment.baseAPIURL +'/users');
  }

  createUser(payload: ICreateUserPayload): Observable<IUserss> {
    return this.httpClient.post<IUserss>(environment.baseAPIURL +'/users', payload);
  }

  updateUser(id: number, payload: IUserss): Observable<IUserss> {
    return this.httpClient.put<IUserss>(environment.baseAPIURL +'/users/'+ id, payload);
  }

  deleteUserById(id: number): Observable<IUserss> {
    return this.httpClient.delete<IUserss>(environment.baseAPIURL +'/users/'+ id);
  }
}