import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersComponent } from './parameters/parameters.component';
import { ListParametersComponent } from './list-parameters/list-parameters.component';
import { AddParametersComponent } from './add-parameters/add-parameters.component';
import { EditParametersComponent } from './edit-parameters/edit-parameters.component';



@NgModule({
  declarations: [ParametersComponent, ListParametersComponent, AddParametersComponent, EditParametersComponent],
  imports: [
    CommonModule
  ]
})
export class ParametersModule { }
