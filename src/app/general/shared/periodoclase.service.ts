import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeriodoClase, Filter } from 'src/app/inventory/shared/master';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList,Response } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';


@Injectable({
  providedIn: 'root'
})
export class PeriodoclaseService {

  constructor(private http:HttpClient) { }



  save(PeriodoClase: PeriodoClase): Observable<PeriodoClase> {
    const url = environment.apiUrl;
    return this.http.post<Response<PeriodoClase>>(`${url}period`, PeriodoClase).pipe(
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


  list(): Observable<PeriodoClase[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<PeriodoClase>>(`${url}period`).pipe(
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


  listByClassPayRoll(filter:Filter):Observable<PeriodoClase[]> {
    const url = environment.apiUrl;
    return this.http.post<ResponseList<PeriodoClase>>(`${url}periodClassPayRoll`, filter).pipe(
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

  getNextPeriod(filter:Filter):Observable<PeriodoClase[]> {
    const url = environment.apiUrl;
    return this.http.post<ResponseList<PeriodoClase>>(`${url}periodNext`, filter).pipe(
      
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
