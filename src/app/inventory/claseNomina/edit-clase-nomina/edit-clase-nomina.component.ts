import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-clase-nomina',
  templateUrl: './edit-clase-nomina.component.html',
  styleUrls: ['./edit-clase-nomina.component.scss']
})
export class EditClaseNominaComponent implements OnInit {


  idClaseNomina:string;

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idClaseNomina = params['id'];
      console.log(this.idClaseNomina);
    });
    
  }

}
