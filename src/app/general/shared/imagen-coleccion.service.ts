import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImagenColeccion } from './imagenColeccion';
import { messages } from './messages';
import { Response, ResponseList } from './response';


@Injectable({
  providedIn: 'root'
})
export class ImagenColeccionService {

  constructor(private http: HttpClient) { }

  save(imagenColeccion: ImagenColeccion): Observable<ImagenColeccion> {

    const url = environment.apiUrl;
    return this.http.post<Response<ImagenColeccion>>(`${url}imagenColeccion`, imagenColeccion).pipe(
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

  getByDocument(imagenColeccion: ImagenColeccion): Observable<ImagenColeccion> {

    const url = environment.apiUrl;
    return this.http.post<Response<ImagenColeccion>>(`${url}imagenColeccion/byDocument`, imagenColeccion).pipe(
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


  delete(faceId: string): Observable<ImagenColeccion> {

    const url = environment.apiUrl;
    return this.http.delete<Response<ImagenColeccion>>(`${url}imagenColeccion/`+faceId).pipe(
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
