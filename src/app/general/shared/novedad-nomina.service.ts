import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { messages } from 'src/app/general/shared/messages';
import { NovedadNomina } from 'src/app/inventory/shared/master';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NovedadNominaService {

  constructor(private http: HttpClient) {}

  save(novedadNomina: NovedadNomina): Observable<NovedadNomina> {
    const url = environment.apiUrl;
    return this.http.post<Response<NovedadNomina>>(`${url}extraHours`, novedadNomina).pipe(
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
