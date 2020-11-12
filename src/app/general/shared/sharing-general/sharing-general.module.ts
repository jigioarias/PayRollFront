import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveNoActivePipe } from '../pipes/active-no-active.pipe';
import { EstadoLicenciaPipe } from '../estado-licencia.pipe';
import { PipeSalaryTypePipe } from '../pipes/pipe-salary-type.pipe';
import { EstadoVacacionesPipe } from '../estado-vacaciones.pipe';
import { EstadoSolicitudVacacionPipe } from '../pipes/estado-solicitud-vacacion.pipe';




@NgModule({
  declarations: [ActiveNoActivePipe,EstadoVacacionesPipe,EstadoLicenciaPipe,PipeSalaryTypePipe,EstadoSolicitudVacacionPipe],
  imports: [
    CommonModule
  ],
  exports: [ActiveNoActivePipe,EstadoVacacionesPipe,EstadoLicenciaPipe,PipeSalaryTypePipe,EstadoLicenciaPipe]

})
export class SharingGeneralModule { }
