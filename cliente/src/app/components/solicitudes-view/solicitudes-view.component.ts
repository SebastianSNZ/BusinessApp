import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-solicitudes-view',
  templateUrl: './solicitudes-view.component.html',
  styleUrls: ['./solicitudes-view.component.css']
})
export class SolicitudesViewComponent implements OnInit {

  nombre_usuario:string=localStorage.getItem('nombre_usuario');
  codigo_usuario:string=localStorage.getItem('codigo_usuario');
  no_cuenta:string=localStorage.getItem('no_cuenta');
  saldo_cuenta:string=localStorage.getItem('saldo_cuenta');
  resp:any=[];
  resps:any=[];
  error:any=[];

  constructor(private userService:UsersService) { }

  ngOnInit() {
    this.recuperar();
  }

  recuperar(){
    this.userService.VerSolicitudes().subscribe(
      res=>{
        this.resp=res;
        this.resps=this.resp.solicitudes;
        console.log(res);
        console.log(this.resps);
      },
      err=>{
        console.log(err);
      }
    );
  }
}
