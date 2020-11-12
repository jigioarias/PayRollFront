import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Concepto, Filter } from 'src/app/inventory/shared/master';
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



  list(enterprise): Observable<Concepto[]> {
    const url = environment.apiUrl;

    let filter :Filter ={
      enterprise:enterprise
    };

    return this.http.post<ResponseList<Concepto>>(`${url}concept`,filter).pipe(
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

  listNovedades(enterprise,conceptType): Observable<Concepto[]> {
    const url = environment.apiUrl;
    let filter :Filter ={
      enterprise:enterprise,
      conceptType :conceptType

    };

    return this.http.post<ResponseList<Concepto>>(`${url}conceptByType`,filter).pipe(
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
 
 
  listConceptosXIds(filter:Filter): Observable<Concepto[]> {
    const url = environment.apiUrl;
   

    return this.http.post<ResponseList<Concepto>>(`${url}conceptsXIds`,filter).pipe(
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
