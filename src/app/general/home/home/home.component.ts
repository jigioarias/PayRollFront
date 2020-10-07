import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {

    this.usuario = localStorage.getItem('user');
    this.licencias = 3;
    this.solicitudVacaciones =10;


  }

  logout(){

    localStorage.clear();
    this.router.navigate([`/logout`]);


  }

}
