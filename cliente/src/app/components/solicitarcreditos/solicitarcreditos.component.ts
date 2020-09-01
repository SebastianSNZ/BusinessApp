import { Component, OnInit } from '@angular/core';
import { Credito } from 'src/app/Models/Credito';
import { MatDialog } from '@angular/material';
import { UsersService } from 'src/app/services/users.service';
import { DialogLoginComponent } from 'src/app/dialog-login/dialog-login.component';

@Component({
  selector: 'app-solicitarcreditos',
  templateUrl: './solicitarcreditos.component.html',
  styleUrls: ['./solicitarcreditos.component.css']
})

export class SolicitarcreditosComponent implements OnInit {

  nombre_usuario:string=localStorage.getItem('nombre_usuario');
  codigo_usuario:string=localStorage.getItem('codigo_usuario');
  no_cuenta:string=localStorage.getItem('no_cuenta');
  saldo_cuenta:string=localStorage.getItem('saldo_cuenta');
  resp:any=[];
  error:any=[]

  sol: Credito={
    no_cuenta: parseInt(this.no_cuenta),
    monto: 0,
    descripcion: ''
  };

  constructor(private userService:UsersService,private dialog:MatDialog) { }

  ngOnInit() {
    console.log(localStorage.getItem('accessToken'));
    console.log(localStorage.getItem('codigo_usuario'));
  }
  Solicitar(){
    this.userService.solicitar(this.sol).subscribe(
      res=>{
        this.resp=res;
        console.log(res);
        this.dialog.open(DialogLoginComponent,{data:{name:this.resp.message}});
        console.log(this.resp);
      },
      err=>{
        this.error=err;
        console.log(err);
        this.dialog.open(DialogLoginComponent,{data:{name:this.error.message}});
      }
    );
  }
}
