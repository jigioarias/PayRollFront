import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response,ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';
import { Incapacidad, IncapacidadData } from 'src/app/inventory/shared/master';


@Injectable({
  providedIn: 'root'
})
export class IncapacidadService {

   IncapacidadesSinAprobar = 0; 
  constructor(private http:HttpClient) { }



  create( Incapacidad:  Incapacidad): Observable<IncapacidadData> {
    const url = environment.apiUrl;
    return this.http.post<Response<IncapacidadData>>(`${url}inability`,  Incapacidad).pipe(
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

  list( Incapacidad:  Incapacidad): Observable< IncapacidadData[]> {
  
    const url = environment.apiUrl;
  
    this.listSinAprobar().subscribe((data)=>{
      this. IncapacidadesSinAprobar = data.length;
    });
 
   if( Incapacidad !=null){ 
    return this.http.post<ResponseList< IncapacidadData>>(`${url}inability/list`,  Incapacidad).pipe(
      switchMap((data) => of(data.content)),
      catchError((error) => {
        if (error.status == 400) {
          return throwError(error.error.message);
        } else {
          return throwError(messages.tecnicalError);
        }
      })
    );
    }else{
      return null;
    }
  }

  updateMasive( Incapacidads:  IncapacidadData[]): Observable< Incapacidad> {
    const url = environment.apiUrl;
    
  
    return this.http.put<Response< Incapacidad>>(`${url}inability/inabilityUpdateMasive`,  Incapacidads).pipe(
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
 

  listSinAprobar(): Observable< IncapacidadData[]> {
  
    const url = environment.apiUrl;
    let  Incapacidad:  Incapacidad = {
      id : 0,
      enterprise : 1,
      document: null,
      initDate :null,
      endDate : null,
      user : null,
      type : null,
      employeeId : 0,
      year : null, 
      registerPeriod : null,
      clase : null,
      salary : 0,
      state : 'S',
      percentage : 0
      };

    
    return this.http.post<ResponseList< IncapacidadData>>(`${url}inability/inabilityList`,  Incapacidad).pipe(
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
