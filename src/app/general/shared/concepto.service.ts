import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Concepto } from 'src/app/inventory/shared/master';
import { ResponseList } from './response';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {

  constructor(private http:HttpClient) { }



  list(): Observable<Concepto[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Concepto>>(`${url}concept`).pipe(
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
