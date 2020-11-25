import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Coleccion } from './imagenColeccion';
import { messages } from './messages';
import { Response,ResponseList } from './response';

@Injectable({
  providedIn: 'root'
})
export class ColeccionService {

  constructor(private http:HttpClient) { }

  save(coleccion: Coleccion): Observable<Coleccion> {
    const url = environment.apiUrl;
    return this.http.post<Response<Coleccion>>(`${url}coleccion`, coleccion).pipe(
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

  list(): Observable<Coleccion> {
    const url = environment.apiUrl;
    return this.http.post<Response<Coleccion>>(`${url}coleccion/list`, localStorage.getItem(messages.variableUserEmpresa)).pipe(
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
