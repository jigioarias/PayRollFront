import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConceptoNomina, Filter } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList,Response } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class ConceptoNominaService {


  constructor(private http:HttpClient) { }



  save(ConceptoNomina: ConceptoNomina): Observable<ConceptoNomina> {
    const url = environment.apiUrl;
    return this.http.post<Response<ConceptoNomina>>(`${url}conceptPayRolls`, ConceptoNomina).pipe(
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

  list(filter:Filter): Observable<ConceptoNomina[]> {
    const url = environment.apiUrl;
    return this.http.post<ResponseList<ConceptoNomina>>(`${url}listConceptPayRolls`,filter).pipe(
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
