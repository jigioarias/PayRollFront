import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FechaCalendarioLaboral, Filter } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response,ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';


@Injectable({
  providedIn: 'root'
})
export class WorkCalendarService {

  constructor(private http:HttpClient) { }



  listDate(filter: Filter): Observable<FechaCalendarioLaboral> {
    const url = environment.apiUrl;
    return this.http.post<Response<FechaCalendarioLaboral>>(`${url}workCalendar/dates`, filter).pipe(
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
