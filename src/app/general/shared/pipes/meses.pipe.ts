import { Pipe, PipeTransform } from '@angular/core';
import { MonthType, MONTH_TYPES } from '../monthType';

@Pipe({
  name: 'meses'
})
export class MesesPipe implements PipeTransform {

  meses : MonthType[];

  transform(value: string, ...args: unknown[]): unknown {
    
    
    this.meses = MONTH_TYPES;
  
    for(let contador =0; contador <this.meses.length;contador++ ){
      let mes =  this.meses[contador];
      if(value == mes.code){
        return mes.description;
      }
      }
      return null;
  }

}
