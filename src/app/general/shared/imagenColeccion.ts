export interface ImagenColeccion {
  id?:string;
  coleccion?: string;
  documento?:string;
  imagen?:string;
  faceId?:string;
  imagenId?:string;
  enterprise?: number; 
  user?:string;
  active?:boolean;


}
export interface RespuestaImagenColeccion{
   FaceRecords?: FaceRecord[];
   FaceModelVersion?:string;
   UnindexedFaces?:string[];
   error?:ErrorColeccion;
}

export interface FaceRecord{
  Face :Face;
  FaceDetail?:FaceDetail;
}

export interface Coleccion {
  id?:number;
  coleccion?: string;
  operacion?:string;
  enterprise?: number; 
  description?:string;
  arn?:string;
  user?:string;
  active?:boolean;
  name?:string;
}

export interface RespuestaColeccion{

  StatusCode?:number;
  CollectionArn?:string;
  FaceModelVersion?: string;  
  error?:ErrorColeccion;
}

export interface DataErrorColeccion{
  message: string;
  code: string;
  time: string;
  requestId: string;
  statusCode: number;
  retryable: boolean;
  retryDelay: number;
}

export interface ErrorColeccion{

  error: DataErrorColeccion;
}




export interface Face{
  FaceId:string;
   BoundingBox: BoundingBox;
  ImageId: string;
  ExternalImageId: string;
  Confidence:number; 

}
export interface BoundingBox{
  Width: number;
  Height:number;
  Left: number;
  Top: number;
}
export interface AgeRange{
  Low: number;
  High: number;
}
export interface LandMark{
  Type: string;
  X:number;
  Y: number;

}

export interface ValueConfidence{
  Value: boolean;
  Confidence: number;
}
export interface Emotions{
  Type: boolean;
  Confidence: number;
}

export interface Pose{
  Roll: number;
  Yaw: number;
  Pitch: number;
}
export interface Quality{
  Brightness: number;
  Sharpness: number;
}


export interface FaceDetail {
  BoundingBox:BoundingBox;
  AgeRange: AgeRange;
  Smile:ValueConfidence;
  Eyeglasses:ValueConfidence;
  Sunglasses:ValueConfidence;
  Gender:ValueConfidence;
  Beard:ValueConfidence;
  Mustache:ValueConfidence;
  EyesOpen:ValueConfidence;
  MouthOpen:ValueConfidence;
  Emotions: Emotions[];
  Landmarks: LandMark[];
  Pose:Pose ;
  Quality: Quality;
  Confidence: number;
}

export interface DeleteFace{
  
    coleccion?:string;
    faceIds?: string[];
    DeletedFaces?:string[];
    error?:ErrorReconocimientoData
   
}

export interface ListColeccion{
  CollectionIds :string[];
  FaceModelVersions:string[];
}

export interface ErrorReconocimiento{
  error :ErrorReconocimientoData;
  
}
export interface ErrorReconocimientoData{
  message?: string;
  code: string;
  time: string;
  requestId: string;
  statusCode: number;
  retryable: boolean;
  retryDelay: number;
  
}

export interface SearchReconocimiento{
  SearchedFaceBoundingBox:SearchedFaceBoundingBox;
  SearchedFaceConfidence:number;
  FaceMatches:Face[];
  FaceModelVersion:string;
}

export interface Face{
  Similarity:number;
  Face:FaceSearched;
  ImageId:string;
  ExternalImageId:string;
  Confidence:number;

}

export interface FaceSearched{
  FaceId:string;
  BoundingBox:SearchedFaceBoundingBox;
}



export interface SearchedFaceBoundingBox{
  Width: number;
  Height: number;
  Left: number;
  Top: number;
}