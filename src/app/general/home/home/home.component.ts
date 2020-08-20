import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario :string;
  constructor() { }

  ngOnInit(): void {

    this.usuario = localStorage.getItem('user');
  }

  logout(){}

}
