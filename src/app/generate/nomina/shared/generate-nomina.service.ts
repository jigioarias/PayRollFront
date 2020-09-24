import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Employee } from 'src/app/inventory/shared/employee';
import { environment } from 'src/environments/environment';
import { Filter, Nomina, EmployeePayRoll, Vacacion } from 'src/app/inventory/shared/master';
import { ResponseList } from 'src/app/general/shared/response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from 'src/app/general/shared/messages';

@Injectable({
  providedIn: 'root'
})
export class GenerateNominaService {


  constructor(private http:HttpClient) { }


  generate(filter:Filter): Observable<EmployeePayRoll[]> {
    const url = environment.apiUrl;


    console.log(filter);
    return this.http.post<ResponseList<EmployeePayRoll>>(`${url}generateClassPayRoll`,filter).pipe(
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

  
  insertVacation(vacation:Vacacion): Observable<EmployeePayRoll[]> {
    const url = environment.apiUrl;

    return this.http.post<ResponseList<EmployeePayRoll>>(`${url}vacation`,vacation).pipe(
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
