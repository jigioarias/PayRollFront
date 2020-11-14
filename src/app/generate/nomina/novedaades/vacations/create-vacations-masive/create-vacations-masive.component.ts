import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { messages } from 'src/app/general/shared/messages';
import { ClaseNomina, Filter } from 'src/app/inventory/shared/master';



@Component({
  selector: 'app-create-vacations-masive',
  templateUrl: './create-vacations-masive.component.html',
  styleUrls: ['./create-vacations-masive.component.scss']
})
export class CreateVacationsMasiveComponent implements OnInit {

  searchForm: FormGroup;
  clases: ClaseNomina[];
  selection: number[];
  constructor(

    private formBuilder: FormBuilder,
    private claseNominaService: ClaseNominaService,
  ) { }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      clase: [null, Validators.required],
      enjoyInitDate: [null, Validators.required],
      enjoyEndDate: [null, Validators.required],

    });

    let filter: Filter = {
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      active: true
    };


    this.claseNominaService.list(filter).subscribe(


      (data) => {
        this.clases = data;
      }, (error) => {
        console.log(error);
      }

    );
  }


  select(claseselect) {
    console.log(claseselect);
    this.selection = claseselect;

  }


  load() {

    console.log(this.selection);
  }

}
