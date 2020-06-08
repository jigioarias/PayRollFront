import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NominaComponent } from './nomina.component';
import { GenerateNominaComponent } from './generate-nomina/generate-nomina.component';

const routes: Routes = [
  {
    path: 'payroll',
    component: NominaComponent,
    children: [
      {
        path: 'generate',
        component: GenerateNominaComponent
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
