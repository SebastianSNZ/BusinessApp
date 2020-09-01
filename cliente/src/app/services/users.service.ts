import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import { Login } from '../models/Login';
import { Transaction } from '../Models/Transaction';
import { Credito } from '../Models/Credito';
import { AproveRejet } from '../Models/AproveReject';
import { Debito } from '../Models/Debito';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 API_URI='http://3.131.100.246:3000/users';
 API_URI2='http://3.131.100.246:3000/transactions';
 API_URI3='http://3.131.100.246:3000/solicitudes';
  headers=new HttpHeaders({
    "x-access-token":localStorage.getItem('accessToken')
  });
  headers2=new HttpHeaders({
    "x-access-token":localStorage.getItem('accessToken')
  });
  constructor(private http:HttpClient) {
    //this.headers.append("Content-type","application/json");
    //this.headers.append("x-access-token",localStorage.getItem('accessToken'));
    //1137040579
   }
  saveUser(user: User){
    return this.http.post(this.API_URI+'/create',user);
  }
  login(log:Login){
    return this.http.post(this.API_URI+'/login',log);
  }
  getTransactions(){
    return this.http.get(this.API_URI2+'/list',{headers:this.headers});
  }
  sendTransaction(tran:Transaction){
    return this.http.post(this.API_URI2+'/user-send',tran,{headers:this.headers});
  }
  Debitar(deb:Debito){
    return this.http.post(this.API_URI2+'/admin-debit',deb,{headers:this.headers});
  }
  solicitar(sol:Credito){
    return this.http.post(this.API_URI3+'/create',sol,{headers:this.headers});
  }
  VerSolicitudes(){
    return this.http.get(this.API_URI3+'/list-my-solicitudes',{headers:this.headers});
  }
  VerSolicitudesAdmin(){
    return this.http.get(this.API_URI3+'/list-admin',{headers:this.headers});
  }
  aprove(id_solicitud:AproveRejet){
    return this.http.post(this.API_URI3+'/aprove',id_solicitud,{headers:this.headers});
  }
  reject(id_solicitud:AproveRejet){
    return this.http.post(this.API_URI3+'/reject',id_solicitud,{headers:this.headers});
  }
}
