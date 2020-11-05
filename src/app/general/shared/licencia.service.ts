import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudVacacion, Filter, SolicitudVacacionData, Licencia, LicenciaData } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response,ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

 
  constructor(private http:HttpClient) { }



  create(licencia: Licencia): Observable<SolicitudVacacion> {
    const url = environment.apiUrl;
    return this.http.post<Response<SolicitudVacacion>>(`${url}leave`, licencia).pipe(
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

  list(licencia: Licencia): Observable<LicenciaData[]> {
  
    const url = environment.apiUrl;
  
    return this.http.post<ResponseList<LicenciaData>>(`${url}leaveList`, licencia).pipe(
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
