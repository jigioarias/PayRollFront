import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Area } from 'src/app/inventory/shared/master';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseList } from './response';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient) { }


  list(): Observable<Area[]> {
    const url = environment.apiUrl;
    return this.http.get<ResponseList<Area>>(`${url}areas`).pipe(
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
