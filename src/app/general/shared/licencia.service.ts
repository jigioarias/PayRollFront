import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Licencia, LicenciaData } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response,ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {

  licenciasSinAprobar = 0; 
  constructor(private http:HttpClient) { }



  create(licencia: Licencia): Observable<LicenciaData> {
    const url = environment.apiUrl;
    return this.http.post<Response<LicenciaData>>(`${url}leave`, licencia).pipe(
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

  list(licencia: Licencia): Observable<LicenciaData[]> {
  
    const url = environment.apiUrl;
  
    this.listSinAprobar().subscribe((data)=>{
      this.licenciasSinAprobar = data.length;
    });
 
   if(licencia !=null){ 
    return this.http.post<ResponseList<LicenciaData>>(`${url}leave/leaveList`, licencia).pipe(
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

  updateMasive(licencias: LicenciaData[]): Observable<Licencia> {
    const url = environment.apiUrl;
    
  
    return this.http.put<Response<Licencia>>(`${url}leave/leaveUpdateMasive`, licencias).pipe(
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
 

  listSinAprobar(): Observable<LicenciaData[]> {
  
    const url = environment.apiUrl;
    let licencia: Licencia = {
      id : 0,
      enterprise :1,
      document: null,
      initDate :null,
      endDate :null,
      user  :null,
      type : null,
      remuneration:  false,
      employeeId :null,
      year : null,
      registerPeriod : null,
      clase : null,
      salary : null,
      state : 'S',
      hours :0
     };

    
    return this.http.post<ResponseList<LicenciaData>>(`${url}leave/leaveList`, licencia).pipe(
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
