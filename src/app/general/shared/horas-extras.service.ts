import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HoraExtra, HoraExtraData } from 'src/app/inventory/shared/master';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseList } from './response';
import { switchMap, catchError } from 'rxjs/operators';
import { messages } from './messages';

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {
   
  constructor(private http:HttpClient) { }




  list(horaExtra: HoraExtra): Observable<HoraExtraData[]> {
  
  const url = environment.apiUrl;
  
 
   if(horaExtra !=null){ 
    return this.http.post<ResponseList<HoraExtraData>>(`${url}extraHoursList`, horaExtra).pipe(
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




}
