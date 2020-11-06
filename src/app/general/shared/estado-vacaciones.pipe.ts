import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoVacaciones'
})
export class EstadoVacacionesPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return '';
  }

}
