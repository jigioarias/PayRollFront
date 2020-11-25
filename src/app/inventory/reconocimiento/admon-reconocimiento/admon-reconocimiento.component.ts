import { HttpClient, HttpErrorResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { ColeccionService } from 'src/app/general/shared/coleccion.service';
import { ImagenColeccionService } from 'src/app/general/shared/imagen-coleccion.service';
import { Coleccion, DeleteFace, ImagenColeccion } from 'src/app/general/shared/imagenColeccion';
import { LABEL } from 'src/app/general/shared/label';
import { Messages, messages } from 'src/app/general/shared/messages';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { ReconocimientoService } from 'src/app/general/shared/reconocimiento.service';
import { ReconocimientoComponent } from '../reconocimiento/reconocimiento.component';

@Component({
  selector: 'app-admon-reconocimiento',
  templateUrl: './admon-reconocimiento.component.html',
  styleUrls: ['./admon-reconocimiento.component.scss']
})
export class AdmonReconocimientoComponent implements OnInit {

  coleccionForm: FormGroup;
  loadImageForm: FormGroup;
  deleteImagenForm : FormGroup;
  listaColeccciones: string[];
  existDocumentToDelete :boolean;

 /** Link text */
 @Input() text = 'Upload';
 /** Name used in form which will be sent in HTTP request. */
 @Input() param = 'file';
 /** Target URL for file uploading. */
 @Input() target = 'https://file.io';
 /** File extension that accepted, same as 'accept' of <input type="file" />. 
     By the default, it's set to 'image/*'. */
 @Input() accept = 'image/*';
 /** Allow you to add handler after its completion. Bubble up response text from remote. */
 @Output() complete = new EventEmitter<string>();

 private files: Array<FileUploadModel> = [];





  constructor(
    private _http: HttpClient,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService,
    private reconocimientoService: ReconocimientoService,
    private coleccionService: ColeccionService,
    private imagenColeccionService: ImagenColeccionService

  ) { }

  ngOnInit(): void {

    this.coleccionForm = this.formBuilder.group({
      coleccion: [null, Validators.required]
    });

    this.deleteImagenForm = this.formBuilder.group({
      coleccionDeleteFace: [null, Validators.required],
      faceId :[null, Validators.required],
      documentoDelete: [null],

    });
    
    this.loadImageForm = this.formBuilder.group({
      coleccionFoto: [null, Validators.required],
      documento: [null, Validators.required],
      foto: [null, Validators.required]

    });

    this.reconocimientoService.listColecciones().subscribe(
      (data)=>{
        this.listaColeccciones = data.CollectionIds;
      }
    ); 

  }

  loadColeccion() {

    let coleccion: Coleccion = {
      coleccion: this.coleccionForm.get("coleccion").value,
      description: this.coleccionForm.get("coleccion").value,
      active: true,
      name: this.coleccionForm.get("coleccion").value,
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      operacion: 'C',
      user: localStorage.getItem(messages.variableUserSession)
    };
    console.log('Coleccion a Cargar', coleccion);


    this.reconocimientoService.createColeccion(coleccion).subscribe((data) => {

      console.log('data:::', data);

      if (data.StatusCode == 200) {
        coleccion.arn = data.CollectionArn;
        this.coleccionService.save(coleccion).subscribe(
          (data2) => {
            console.log('data2:::', data2);
            this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.colection, ''));
          },
          (error) => {
            this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.colection, ''));
          }
        );

      }


    },
      (error) => {
        console.log(error);
      }
    );

  }


 findDocumentDelete(){

  let imagenColeccionRequest: ImagenColeccion = {
    
    documento: this.deleteImagenForm.get('documentoDelete').value,
    enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa))
  };
    this.imagenColeccionService.getByDocument(imagenColeccionRequest).subscribe(
      (data)=> { 

        if(data!=null){
            this.existDocumentToDelete =true;
            this.deleteImagenForm.get('faceId').setValue(data.faceId);
            this.deleteImagenForm.get('coleccionDeleteFace').setValue(data.coleccion);
          }else{
            this.messagesService.showWarningMessage(Messages.get('not_data_found', LABEL.imagenColeccion, ''));

          }
       },
      (error)=>{
        this.existDocumentToDelete = false;
      } 
    );

 }


  deleteImagen() {

    let valor = this.deleteImagenForm.get('faceId').value;
    let faces :string[]= [valor];
    console.log('faceIds:::',faces[0]);
    //faces[0]=this.deleteImagenForm.get('faceId').value;

    let deleteFace: DeleteFace = {
      coleccion: this.deleteImagenForm.get("coleccionDeleteFace").value,
      faceIds:faces
      
    };

    console.log('Coleccion a Cargar', deleteFace);


    this.reconocimientoService.deleteImagen(deleteFace).subscribe((data) => {

      console.log('data:::', data);

      if (data.error==null) {
      console.log('DeletedFaces:::',data.DeletedFaces.length);
      if(data.DeletedFaces.length > 0){

        let face = data.DeletedFaces[0];
        this.imagenColeccionService.delete(face).subscribe(
          (data2) => {
            this.deleteImagenForm.get('faceId').setValue(null);
            this.deleteImagenForm.get('coleccionDeleteFace').setValue(null);
            this.messagesService.showSuccessMessage(Messages.get('delete_success', LABEL.imagenColeccion, ''));
          },
          (error) => {
            this.deleteImagenForm.get('faceId').setValue(null);
            this.deleteImagenForm.get('coleccionDeleteFace').setValue(null);
            this.messagesService.showErrorMessage(Messages.get('delete_error', LABEL.imagenColeccion, ''));
          }

        
        );
       }
      }else{
        this.deleteImagenForm.get('faceId').setValue(null);
        this.deleteImagenForm.get('coleccionDeleteFace').setValue(null);
        this.messagesService.showErrorMessage(Messages.get('delete_error', LABEL.imagenColeccion, data.error.message));

      }


    },
      (error) => {
        console.log(error);
      }
    );

  }

  async fotoInputChange(fileInputEvent: any) {



    var file: File = fileInputEvent.target.files[0];
    var self = this;
    var myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    console.log(myReader)


    myReader.onloadend = await function (e) {

      let archivo = myReader.result as string;
      archivo = archivo.replace(/^data:image\/(jpeg|png|jpg);base64,/, "");

      let imagenColeccionRequest: ImagenColeccion = {
        coleccion: self.loadImageForm.get('coleccionFoto').value,
        documento: self.loadImageForm.get('documento').value,
        imagen: archivo
      };

      self.reconocimientoService.loadImage(imagenColeccionRequest).subscribe((data) => {
        console.log(data);
        if (data.FaceRecords != null && data.FaceRecords.length > 0) {

          let registroFace = data.FaceRecords[0];
          imagenColeccionRequest.faceId = registroFace.Face.FaceId;
          imagenColeccionRequest.imagenId = registroFace.Face.ImageId;
          imagenColeccionRequest.imagen = null;
          imagenColeccionRequest.active = true;
          imagenColeccionRequest.enterprise = parseInt(localStorage.getItem(messages.variableUserEmpresa));
          imagenColeccionRequest.user = localStorage.getItem(messages.variableUserSession);
          console.log(imagenColeccionRequest);

          self.imagenColeccionService.save(imagenColeccionRequest).subscribe(
            (data2) => {
              console.log('data2', data2);
              self.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.imagenColeccion, ''));
            },
            (error) => {
              self.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.imagenColeccion, ''));
            }
          );



        }
      },
        (error) => {
          console.log(error);
        }
      )


    };


  }

//aca archivos

onClick() {
  const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
  fileUpload.onchange = () => {
        for (let index = 0; index < fileUpload.files.length; index++) {
              const file = fileUpload.files[index];
              this.files.push({ data: file, state: 'in', 
                inProgress: false, progress: 0, canRetry: false, canCancel: true });
        }
        this.uploadFiles();
  };
  fileUpload.click();
}

cancelFile(file: FileUploadModel) {
  file.sub.unsubscribe();
  this.removeFileFromArray(file);
}

retryFile(file: FileUploadModel) {
  this.uploadFile(file);
  file.canRetry = false;
}

private uploadFile(file: FileUploadModel) {
  const fd = new FormData();
  fd.append(this.param, file.data);

  const req = new HttpRequest('POST', this.target, fd, {
        reportProgress: true
  });

  file.inProgress = true;
  file.sub = this._http.request(req).pipe(
        map(event => {
              switch (event.type) {
                    case HttpEventType.UploadProgress:
                          file.progress = Math.round(event.loaded * 100 / event.total);
                          break;
                    case HttpEventType.Response:
                          return event;
              }
        }),
        tap(message => { }),
        last(),
        catchError((error: HttpErrorResponse) => {
              file.inProgress = false;
              file.canRetry = true;
              return of(`${file.data.name} upload failed.`);
        })
  ).subscribe(
        (event: any) => {
              if (typeof (event) === 'object') {
                    this.removeFileFromArray(file);
                    this.complete.emit(event.body);
              }
        }
  );
}

private uploadFiles() {
  const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
  fileUpload.value = '';

  this.files.forEach(file => {
        this.uploadFile(file);
  });
}

private removeFileFromArray(file: FileUploadModel) {
  const index = this.files.indexOf(file);
  if (index > -1) {
        this.files.splice(index, 1);
  }
}



}


export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}