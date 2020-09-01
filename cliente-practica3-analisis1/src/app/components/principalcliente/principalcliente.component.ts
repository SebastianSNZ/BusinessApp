import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principalcliente',
  templateUrl: './principalcliente.component.html',
  styleUrls: ['./principalcliente.component.css']
})
export class PrincipalclienteComponent implements OnInit {
nombre_usuario:string=localStorage.getItem('nombre_usuario');
codigo_usuario:string=localStorage.getItem('codigo_usuario');
no_cuenta:string=localStorage.getItem('no_cuenta');
saldo_cuenta:string=localStorage.getItem('saldo_cuenta')
  constructor() { }

  ngOnInit() {
  }

}
