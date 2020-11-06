import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoLicencia'
})
export class EstadoLicenciaPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value=='A'){
      return 'Aprobado';
    }
    if (value=='R'){
      return 'Rechazado';
    }
    if (value=='S'){
      return 'Sin Aprobar';
    }
    return '';

  }

}
