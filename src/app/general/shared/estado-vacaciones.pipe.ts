import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoVacaciones'
})
export class EstadoVacacionesPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
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
