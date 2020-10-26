
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Response, ResponseList } from 'src/app/general/shared/response';
import { messages } from 'src/app/general/shared/messages';
import { Employee, EmployeeData, EmployeeDTO } from './employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  save(employee: Employee): Observable<Employee> {
    const url = environment.apiUrl;
    return this.http.post<Response<Employee>>(`${url}employees`, employee).pipe(
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


  
  saveMasive(employees: Employee[]): Observable<Employee> {
    const url = environment.apiUrl;
    return this.http.post<Response<Employee>>(`${url}employeesMasive`, employees).pipe(
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

  //
  list(empleado:Employee): Observable<Employee[]> {
    const url = environment.apiUrl;

    
    return this.http.post<ResponseList<Employee>>(`${url}listEmployees`,empleado).pipe(
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

  find(id: string): Observable<Employee> {
    const url = environment.apiUrl;
    return this.http.get<Response<Employee>>(`${url}employees/` + id).pipe(
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
  get(id: string): Observable<Employee> {
    const url = environment.apiUrl;
    return this.http.get<Response<Employee>>(`${url}employee/` + id).pipe(
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


  update(employee: Employee): Observable<EmployeeDTO> {
    const url = environment.apiUrl;
    return this.http.put<Response<EmployeeDTO>>(`${url}employees`, employee).pipe(
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
