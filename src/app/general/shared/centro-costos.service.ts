import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CentroCostos } from 'src/app/inventory/shared/master';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from './response';
import { messages } from './messages';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {



  constructor(private http:HttpClient) { }


  list(): Observable<CentroCostos[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<CentroCostos>>(`${url}centroCostos`).pipe(
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
