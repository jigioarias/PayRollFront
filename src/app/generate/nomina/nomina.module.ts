import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovedadesComponent } from './novedades/novedades.component';
import { NominaComponent } from './nomina.component';
import { GenerateNominaComponent } from './generate-nomina/generate-nomina.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/general/material/material.module';
import { NominaRoutingModule } from './nomina-routing.module';
import { VacationsComponent } from './novedades/vacations/vacations.component';
import { ListRequestVacationsComponent } from './novedades/vacations/list-request-vacations/list-request-vacations.component';
import { LeavesComponent } from './novedades/leaves/leaves.component';
import { ListLeavesComponent } from './novedades/leaves/list-leaves/list-leaves.component';
import { ListInabilitiesComponent } from './novedades/list-inabilities/list-inabilities.component';
import { ListLoansComponent } from './novedades/list-loans/list-loans.component';
import { RegisterComponent } from './novedades/register/register.component';
import { SharingGeneralModule } from 'src/app/general/shared/sharing-general/sharing-general.module';



@NgModule({
  declarations: [NovedadesComponent, NominaComponent,GenerateNominaComponent, VacationsComponent, ListRequestVacationsComponent, LeavesComponent, ListLeavesComponent, ListInabilitiesComponent, ListLoansComponent, RegisterComponent],
  imports: [
    
    SharingGeneralModule,
    CommonModule, ReactiveFormsModule, MaterialModule, NominaRoutingModule,
  ]
})
export class NominaModule { }
