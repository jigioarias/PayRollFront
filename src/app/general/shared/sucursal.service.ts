import { Injectable } from '@angular/core';
import { Sucursal } from 'src/app/inventory/shared/master';
import { ResponseList } from './response';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient) { }


  list(): Observable<Sucursal[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Sucursal>>(`${url}sucursals`).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
  }
}
