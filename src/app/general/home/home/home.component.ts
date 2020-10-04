import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario :string;
  licencias :number;
  solicitudVacaciones : number;
  opened :boolean;

  constructor() { }

  ngOnInit(): void {

    this.usuario = localStorage.getItem('user');
    this.licencias = 3;
    this.solicitudVacaciones =10;


  }

  logout(){}

}
