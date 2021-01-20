import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { EntradasService } from 'src/app/general/shared/entradas.service';
import { DataEntrada, Entrada, Filter } from '../../shared/master';

const ELEMENT_DATA: DataEntrada[] = [];


@Component({
  selector: 'app-reconocimiento',
  templateUrl: './reconocimiento.component.html',
  styleUrls: ['./reconocimiento.component.scss']
})
export class ReconocimientoComponent implements OnInit {

  displayedColumns: string[] = ['empleado','puerta','fechaCompleta'];
  dataSource = ELEMENT_DATA;
  private updateSubscription: Subscription;

  constructor(
    private entradaService:EntradasService
  ) { }

  ngOnInit(): void {

    this.updateSubscription = interval(9000).subscribe(
      (val) => { this.listarEntradas()
    }
  
  );

}

 private listarEntradas(){
   
  
  let  filter: Filter ={
    fecha: "2020-12-21",
     }
    this.entradaService.list(filter).subscribe(data=>{
      console.log(data);  
      this.dataSource = data.Items;
    
   })
 }

}
