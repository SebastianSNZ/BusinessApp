import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {UsersFormComponent} from './components/users-form/users-form.component';
import {PrincipalclienteComponent} from './components/principalcliente/principalcliente.component';
import {PrincipaladminComponent} from './components/principaladmin/principaladmin.component';
import {TransaccionesViewComponent} from './components/transacciones-view/transacciones-view.component';
import {TransferenciaFormComponent} from './components/transferencia-form/transferencia-form.component';
import {SolicitarcreditosComponent} from './components/solicitarcreditos/solicitarcreditos.component';
import {SolicitudesViewComponent} from './components/solicitudes-view/solicitudes-view.component';
import {SolicitudesAdminComponent} from './components/solicitudes-admin/solicitudes-admin.component'
import {DebitacionComponent} from './components/debitacion/debitacion.component'
const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'userform',
    component:UsersFormComponent
  },
  {
    path:'principalc',
    component:PrincipalclienteComponent
  },
  {
    path: 'principala',
    component:PrincipaladminComponent
  },
  {
    path:'transactions',
    component:TransaccionesViewComponent
  },
  {
    path:'transferencia',
    component:TransferenciaFormComponent
  },
  {
    path:'scredito',
    component:SolicitarcreditosComponent
  },
  {
    path:'missolicitudes',
    component:SolicitudesViewComponent
  },
  {
    path:'solicitudes',
    component:SolicitudesAdminComponent
  },
  {
    path:'debito',
    component:DebitacionComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
