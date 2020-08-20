import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { switchMap, catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';
import { messages } from './messages';
import { Response } from './response';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

   
  loginIn(usuario:User): Observable<User>{

    const url = environment.apiUrl;

    console.log('usuario a enviaar',usuario);
    return this.http.post<Response<User>>(`${url}user`, usuario).pipe(
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
