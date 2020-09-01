import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Transaction} from 'src/app/Models/Transaction'
import { Login } from 'src/app/models/Login';
@Component({
  selector: 'app-transacciones-view',
  templateUrl: './transacciones-view.component.html',
  styleUrls: ['./transacciones-view.component.css']
})
export class TransaccionesViewComponent implements OnInit {
  transaction:any=[];

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
  transacciones:any=[];
  debe:any=[];
  credito:any=[];
  login:any=[];

  constructor(private userService:UsersService) { }

  ngOnInit() {
    console.log(localStorage.getItem('nombre_usuario'));
    this.recuperar();
    this.actualizar();
  }
  recuperar(){
    this.userService.getTransactions().subscribe(
      res=>{
        this.transaction=res;
        this.transacciones=this.transaction.transacciones;
        console.log(this.transacciones);
        this.SCreditoDebito();
      }
    );
  }

  SCreditoDebito(){
    for( var i= 0;i<this.transacciones.length;i++){
      //console.log(this.transacciones[i].tipo);
      if(this.transacciones[i].tipo=='credito'){
        this.credito.push(this.transacciones[i]);
      }else{
        this.debe.push(this.transacciones[i]);
      }
    }
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
