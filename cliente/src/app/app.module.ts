import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { LoginComponent } from './components/login/login.component';
import {UsersService} from './services/users.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogUsercreateComponent } from './dialog-usercreate/dialog-usercreate.component';
import { PrincipalclienteComponent } from './components/principalcliente/principalcliente.component';
import { PrincipaladminComponent } from './components/principaladmin/principaladmin.component';
import { TransaccionesViewComponent } from './components/transacciones-view/transacciones-view.component';
import { TransferenciaFormComponent } from './components/transferencia-form/transferencia-form.component';
import { DialogTransaccionComponent } from './dialog-transaccion/dialog-transaccion.component';
import { SolicitarcreditosComponent } from './components/solicitarcreditos/solicitarcreditos.component';
import { DialogSolicitudComponent } from './dialog-solicitud/dialog-solicitud.component';
import { SolicitudesViewComponent } from './components/solicitudes-view/solicitudes-view.component';
import { SolicitudesAdminComponent } from './components/solicitudes-admin/solicitudes-admin.component';
import { DialogAprovarrechazarComponent } from './dialog-aprovarrechazar/dialog-aprovarrechazar.component';
import { DialogDebitarComponent } from './dialog-debitar/dialog-debitar.component';
import { DebitacionComponent } from './components/debitacion/debitacion.component';
@NgModule({
  declarations: [
    AppComponent,
    UsersFormComponent,
    LoginComponent,
    DialogLoginComponent,
    DialogUsercreateComponent,
    PrincipalclienteComponent,
    PrincipaladminComponent,
    TransaccionesViewComponent,
    TransferenciaFormComponent,
    DialogTransaccionComponent,
    SolicitarcreditosComponent,
    DialogSolicitudComponent,
    SolicitudesViewComponent,
    SolicitudesAdminComponent,
    DialogAprovarrechazarComponent,
    DialogDebitarComponent,
    DebitacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    DialogLoginComponent,
    DialogUsercreateComponent,
    DialogLoginComponent,
    DialogAprovarrechazarComponent,
    DialogDebitarComponent
  ]
})
export class AppModule { }
