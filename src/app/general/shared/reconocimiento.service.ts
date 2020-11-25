import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Coleccion, DeleteFace, ImagenColeccion, ListColeccion, RespuestaColeccion, RespuestaImagenColeccion } from './imagenColeccion';
import { Response } from './response';


@Injectable({
  providedIn: 'root'
})
export class ReconocimientoService {

  constructor(private http: HttpClient) { }


  createColeccion(coleccion: Coleccion): Observable<RespuestaColeccion> {

    const url = environment.apiReconocimiento;
    console.log('URL reconocimiento:::', url);
    //const url ='https://bj275e25ea.execute-api.us-east-1.amazonaws.com/test2/';
    //https://bj275e25ea.execute-api.us-east-1.amazonaws.com/test2/RekonocimientoPrueba
    return this.http.post<RespuestaColeccion>(`${url}RekonocimientoPrueba`, coleccion).pipe(
      switchMap((data) => of(data)),
      catchError((error) => {
        return throwError(error);
      })
    );

  }

  listColecciones(): Observable<ListColeccion> {

    const url = environment.apiReconocimiento;
    return this.http.get<ListColeccion>(`${url}listcolecciones`).pipe(
      switchMap((data) => of(data)),
      catchError((error) => {
        return throwError(error);
      })
    );

  }


  loadImage(imagenColeccion: ImagenColeccion): Observable<RespuestaImagenColeccion> {

    const url = environment.apiReconocimiento;

    return this.http.post<RespuestaColeccion>(`${url}indexarimagen`, imagenColeccion).pipe(
      switchMap((data) => of(data)),
      catchError((error) => {

        return throwError(error);
      })
    );

  }


  deleteImagen(deleteFace: DeleteFace): Observable<DeleteFace> {

    const url = environment.apiReconocimiento;

    return this.http.post<DeleteFace>(`${url}deletefaces`, deleteFace).pipe(
      switchMap((data) => of(data)),
      catchError((error) => {
        return throwError(error);
      })
    );

  } 



}
