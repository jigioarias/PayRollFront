import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClaseNomina, ClaseNominaDTO } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response,ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class ClaseNominaService {


  constructor(private http:HttpClient) { }

  save(claseNomina: ClaseNomina): Observable<ClaseNominaDTO> {
    const url = environment.apiUrl;
    return this.http.post<Response<ClaseNominaDTO>>(`${url}classPayRolls`, claseNomina).pipe(
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

  update(claseNomina: ClaseNomina): Observable<ClaseNominaDTO> {
    const url = environment.apiUrl;
    return this.http.put<Response<ClaseNominaDTO>>(`${url}classPayRolls`, claseNomina).pipe(
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



  list(): Observable<ClaseNomina[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<ClaseNomina>>(`${url}classPayRolls`).pipe(
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

  get(id:number): Observable<ClaseNomina> {
    const url = environment.apiUrl;
    return this.http.get<Response<ClaseNomina>>(`${url}classPayRoll/`+id).pipe(
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
