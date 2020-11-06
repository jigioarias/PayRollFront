import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveNoActivePipe } from '../pipes/active-no-active.pipe';
import { EstadoLicenciaPipe } from '../estado-licencia.pipe';
import { PipeSalaryTypePipe } from '../pipes/pipe-salary-type.pipe';
import { EstadoVacacionesPipe } from '../estado-vacaciones.pipe';



@NgModule({
  declarations: [ActiveNoActivePipe,EstadoVacacionesPipe,EstadoLicenciaPipe,PipeSalaryTypePipe],
  imports: [
    CommonModule
  ],
  exports: [ActiveNoActivePipe,EstadoVacacionesPipe,EstadoLicenciaPipe,PipeSalaryTypePipe]

})
export class SharingGeneralModule { }
