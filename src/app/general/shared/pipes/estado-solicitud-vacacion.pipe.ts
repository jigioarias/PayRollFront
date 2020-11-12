import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoSolicitudVacacioPipe'
})
export class EstadoSolicitudVacacionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value=='A'){
      return 'Aprobado';
    }
    if (value=='R'){
      return 'Rechazado';
    }
    if (value=='P'){
      return 'Pendiente';
    }
    return '';
  }

}
