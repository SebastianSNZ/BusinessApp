import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-principaladmin',
  templateUrl: './principaladmin.component.html',
  styleUrls: ['./principaladmin.component.css']
})
export class PrincipaladminComponent implements OnInit {
  nombre_usuario:string=localStorage.getItem('nombre_usuario');
  codigo_usuario:string=localStorage.getItem('codigo_usuario');
  no_cuenta:string=localStorage.getItem('no_cuenta');
  saldo_cuenta:string=localStorage.getItem('saldo_cuenta')
  constrasenia:string=localStorage.getItem('contrasenia');
  log: Login={
    codigo_usuario: parseInt(this.codigo_usuario),
    nombre_usuario: this.nombre_usuario,
    contrasenia: this.constrasenia
  };
  login:any=[];
  constructor(private userService:UsersService) { }

  ngOnInit() {
    this.actualizar();
  }

  actualizar(){
    this.userService.login(this.log).subscribe(
      res=>{
        console.log('el objeto es: ');
        this.login=res;
        localStorage.setItem('saldo_cuenta',this.login.saldo_cuenta);
        console.log(localStorage.getItem('saldo_cuenta'));
      },err=>
      {
        console.log(err);
      }
    )
  }
}
