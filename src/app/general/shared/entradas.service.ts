import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Entrada, Filter } from 'src/app/inventory/shared/master';
import { environment } from 'src/environments/environment';
import { messages } from './messages';
import { ResponseList } from './response';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  entradas = []; 


  constructor(private http: HttpClient) { }


 list(filtro:Filter): Observable<Entrada> {

    const url = environment.apiEntrada;

    return this.http.post<Entrada>(`${url}consultarAccesoEntrada`,filtro).pipe(
      switchMap((data) => of(data)),
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
