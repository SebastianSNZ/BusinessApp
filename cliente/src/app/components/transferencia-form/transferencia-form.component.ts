import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/Models/Transaction';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { DialogLoginComponent } from 'src/app/dialog-login/dialog-login.component';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-transferencia-form',
  templateUrl: './transferencia-form.component.html',
  styleUrls: ['./transferencia-form.component.css']
})
export class TransferenciaFormComponent implements OnInit {
  nombre_usuario:string=localStorage.getItem('nombre_usuario');
  codigo_usuario:string=localStorage.getItem('codigo_usuario');
  no_cuenta:string=localStorage.getItem('no_cuenta');
  saldo_cuenta:string=localStorage.getItem('saldo_cuenta');
  constrasenia:string=localStorage.getItem('contrasenia');
  log: Login={
    codigo_usuario: parseInt(this.codigo_usuario),
    nombre_usuario: this.nombre_usuario,
    contrasenia: this.constrasenia
  };
  tran:Transaction={
    no_cuenta_destino: 0,
    monto: 0
  };
  respuesta:any=[];
  error:any=[];
  login:any=[];
  constructor(private userService:UsersService,private dialog:MatDialog) { }

  ngOnInit() {
  }
  Transferencia(){
    this.userService.sendTransaction(this.tran).subscribe(
      res=>{
        this.respuesta=res;
        console.log(this.respuesta);
        this.actualizar();
        this.dialog.open(DialogLoginComponent,{data:{name:this.respuesta.message}});
      }, err=>{
        this.error=err;
        console.log(this.error);
      }
    );
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
        this.dialog.open(DialogLoginComponent,{data:{name:err.error.message}});
      }
    )
  }
}
