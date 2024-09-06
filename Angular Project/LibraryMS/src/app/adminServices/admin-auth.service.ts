import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdmin } from '../adminmodule/admins';
import { baseURL } from 'src/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private urlAdmin: string = baseURL+ '/admins';

  constructor(private http: HttpClient) { }
  getAdmins(): Observable<IAdmin[]> {
    return this.http.get<IAdmin[]>(this.urlAdmin+'/GetAllAdmins');
  }

  getAdmin(id: number): Observable<IAdmin> {
    return this.http.get<IAdmin>(this.urlAdmin + '/' + id);
  }

}
