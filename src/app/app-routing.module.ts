import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { HomeComponent } from './general/home/home/home.component';
import { NominaModule } from './generate/nomina/nomina.module';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => NominaModule
    },

    {
        path: '',
        loadChildren: () => InventoryModule
    },
    {
        path: '',
        loadChildren: () => ReportsModule
    }
     
    
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
