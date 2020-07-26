import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NominaComponent } from './nomina.component';
import { GenerateNominaComponent } from './generate-nomina/generate-nomina.component';
import { VacationsComponent } from './novedades/vacations/vacations.component';
import { ListRequestVacationsComponent } from './novedades/vacations/list-request-vacations/list-request-vacations.component';

const routes: Routes = [
  {
    path: 'payroll',
    component: NominaComponent,
    children: [
      {
        path: 'generate',
        component: GenerateNominaComponent
      },
      
      {
        path: 'vacations',
        component: ListRequestVacationsComponent
       // component: VacationsComponent
      },
     { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NominaRoutingModule {}
