import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/models/User';
import { Router } from '@angular/router';
import {UsersService} from '../../services/users.service'
import {MatDialog,MatDialogConfig} from '@angular/material';
import { DialogUsercreateComponent } from 'src/app/dialog-usercreate/dialog-usercreate.component';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  user: User={
      nombre_usuario: '',
      correo: '',
      nombre_completo: '',
      contrasenia: ''
  };
  registro:any=[];
  error:any=[];
  constructor(private userService:UsersService,private router: Router, private dialog:MatDialog,) { }

  ngOnInit() {
  }
  saveNewUser(){
    this.userService.saveUser(this.user)
    .subscribe(
      res=>{
        console.log(res);
        this.registro=res;
        this.dialog.open(DialogUsercreateComponent,{data:{name:this.registro.codigo_usuario,cuenta:this.registro.no_cuenta}});
      },err=>{
        console.error(err)
        this.error=err;
      }
    )
  }
  LOGIN(){
    this.router.navigate(['/login']);
  }
}
