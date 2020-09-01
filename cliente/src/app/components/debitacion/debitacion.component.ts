import { Component, OnInit } from '@angular/core';
import { Debito } from 'src/app/Models/Debito';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { DialogDebitarComponent } from 'src/app/dialog-debitar/dialog-debitar.component';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-debitacion',
  templateUrl: './debitacion.component.html',
  styleUrls: ['./debitacion.component.css']
})
export class DebitacionComponent implements OnInit {

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

  ar: Debito={
    no_cuenta_debito:0,
    monto:0,
    descripcion:''
  };

  resp:any=[];
  resps:any=[];
  error:any=[];

  constructor(private userService:UsersService,private dialog:MatDialog) { }

  ngOnInit() {
  }

  Debito(){
    this.userService.Debitar(this.ar).subscribe(
      res=>{
        this.resp=res;
        console.log(this.resp);
        this.dialog.open(DialogDebitarComponent,{data:{name:this.resp.message}});
        this.actualizar();
      },
      err=>{
        this.error=err;
        console.log(this.error);
        this.dialog.open(DialogDebitarComponent,{data:{name:this.resp.message}});
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
      }
    );
  }
}
