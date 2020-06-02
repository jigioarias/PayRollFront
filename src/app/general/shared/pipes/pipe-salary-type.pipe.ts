import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeSalaryType'
})
export class PipeSalaryTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
