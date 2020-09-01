import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/Login';
import { Router } from '@angular/router';
import {UsersService} from '../../services/users.service';
import {MatDialog,MatDialogConfig} from '@angular/material';
import { DialogLoginComponent } from 'src/app/dialog-login/dialog-login.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  log: Login={
    codigo_usuario: 0,
    nombre_usuario: '',
    contrasenia: ''
  };
  login:any=[];
  mensaje:string="";
  constructor(private userService:UsersService,private router: Router,private dialog:MatDialog) { }

  ngOnInit() {
  }
  Registrar(){
    this.router.navigate(['/userform']);
  }
  LogIn(){
    console.log("Iniciando Sesion");
    console.log(this.log);
    Number(this.log.codigo_usuario);
    this.userService.login(this.log)
    .subscribe(
      res=>{
        console.log('el objeto es: ');
        this.login=res;
        console.log(this.login);
        localStorage.setItem('codigo_usuario' , String(this.log.codigo_usuario));
        console.log(localStorage.getItem('codigo_usuario'));
        localStorage.setItem('accessToken' , this.login.accessToken);
        console.log(localStorage.getItem('accessToken'));
        localStorage.setItem('no_cuenta' , this.login.no_cuenta);
        console.log(localStorage.getItem('no_cuenta'));
        localStorage.setItem('nombre_usuario' , this.login.nombre_usuario);
        console.log(localStorage.getItem('no_cuenta'));
        this.dialog.open(DialogLoginComponent,{data:{name:this.login.message}});
        localStorage.setItem('saldo_cuenta',this.login.saldo_cuenta);
        console.log(localStorage.getItem('saldo_cuenta'));
        localStorage.setItem('contrasenia',this.log.contrasenia);
        this.prove();
      },err=>
      {
        console.log(err);
        this.dialog.open(DialogLoginComponent,{data:{name:err.error.message}});
      }
    );
  }
  prove(){
    if(this.login.rol=='cliente'){
      this.router.navigate(['/principalc']);
      //usuarios de prueba codigos 84225 y 84226
    }else if(this.login.rol=='admin'){
      this.router.navigate(['/principala']);
    }
  }
}
