import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudVacacion } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response,ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVacacionService {


  constructor(private http:HttpClient) { }



  update(solicitudVacacion: SolicitudVacacion): Observable<SolicitudVacacion> {
    const url = environment.apiUrl;
    return this.http.put<Response<SolicitudVacacion>>(`${url}vacationRequest`, solicitudVacacion).pipe(
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

  list(solicitud: SolicitudVacacion): Observable<SolicitudVacacion[]> {
    const url = environment.apiUrl;
  
    return this.http.post<ResponseList<SolicitudVacacion>>(`${url}vacationRequestList`, solicitud).pipe(
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

