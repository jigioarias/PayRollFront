import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Employee } from 'src/app/inventory/shared/employee';
import { environment } from 'src/environments/environment';
import { Filter } from 'src/app/inventory/shared/master';
import { ResponseList } from 'src/app/general/shared/response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from 'src/app/general/shared/messages';

@Injectable({
  providedIn: 'root'
})
export class GenerateNominaService {


  constructor(private http:HttpClient) { }




  generate(filter:Filter): Observable<Employee[]> {
    const url = environment.apiUrl;

    return this.http.post<ResponseList<Employee>>(`${url}generateClassPayRoll`,filter).pipe(
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
