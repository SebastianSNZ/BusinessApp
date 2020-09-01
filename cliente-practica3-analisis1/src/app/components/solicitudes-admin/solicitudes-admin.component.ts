import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AproveRejet } from 'src/app/Models/AproveReject';
import { MatDialog } from '@angular/material';
import { DialogAprovarrechazarComponent } from 'src/app/dialog-aprovarrechazar/dialog-aprovarrechazar.component';

@Component({
  selector: 'app-solicitudes-admin',
  templateUrl: './solicitudes-admin.component.html',
  styleUrls: ['./solicitudes-admin.component.css']
})
export class SolicitudesAdminComponent implements OnInit {

  nombre_usuario:string=localStorage.getItem('nombre_usuario');
  codigo_usuario:string=localStorage.getItem('codigo_usuario');
  no_cuenta:string=localStorage.getItem('no_cuenta');
  saldo_cuenta:string=localStorage.getItem('saldo_cuenta');

  ar: AproveRejet={
    id_solicitud:''
  };

  resp:any=[];
  resps:any=[];
  error:any=[];

  constructor(private userService:UsersService,private dialog:MatDialog) { }

  ngOnInit() {
    this.recuperar();
  }
  recuperar(){
    this.userService.VerSolicitudesAdmin().subscribe(
      res=>{
        this.resp=res;
        this.resps=this.resp.solitudes;
        //console.log(this.resp);
        console.log(this.resps);
        console.log(localStorage.getItem('accessToken'));
      }
    );
  }
  aprove(id:string){
    this.ar.id_solicitud=id;
    console.log(this.ar.id_solicitud);
    this.userService.aprove(this.ar).subscribe(
      res=>{
        this.resps=res;
        this.dialog.open(DialogAprovarrechazarComponent,{data:{name:this.resps.message}});
        this.ngOnInit();
      },
      err=>{
        this.error=err;
        this.dialog.open(DialogAprovarrechazarComponent,{data:{name:this.error.message}});
        this.ngOnInit();
      }
    );
  }
  reject(id:string){
    this.ar.id_solicitud=id;
    console.log(this.ar.id_solicitud);
    this.userService.reject(this.ar).subscribe(
      res=>{
        this.resps=res;
        this.dialog.open(DialogAprovarrechazarComponent,{data:{name:this.resps.message}});
        this.ngOnInit();
      },
      err=>{
        this.error=err;
        this.dialog.open(DialogAprovarrechazarComponent,{data:{name:this.error.message}});
        this.ngOnInit();
      }
    );
  }
}
