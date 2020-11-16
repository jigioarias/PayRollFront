import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudVacacion, Filter, SolicitudVacacionData } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response,ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';
import { PENDIENTE } from './EstadosSolicitudVacacionType';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVacacionService {

  solicitudesVacacionesSinAprobar = 0; 

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

  list(solicitud: SolicitudVacacion): Observable<SolicitudVacacionData[]> {
    const url = environment.apiUrl;

    this.listSinAprobar().subscribe((data)=>{
      this.solicitudesVacacionesSinAprobar = data.length;
    });
 

    return this.http.post<ResponseList<SolicitudVacacionData>>(`${url}vacationRequest/list`, solicitud).pipe(
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

  listSinAprobar(): Observable<SolicitudVacacionData[]> {
  
    const url = environment.apiUrl;

    let solicitud: SolicitudVacacion = {
      id: 0,
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      document: null,
      enjoyInitDate: null,
      enjoyEndDate: null,
      moneyDays: null,
      state: PENDIENTE.code,
      remuneration: false,
      user: null

    }
    
    return this.http.post<ResponseList<SolicitudVacacionData>>(`${url}vacationRequest/list`, solicitud).pipe(
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

