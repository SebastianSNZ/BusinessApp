import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog-solicitud',
  templateUrl: './dialog-solicitud.component.html',
  styleUrls: ['./dialog-solicitud.component.css']
})
export class DialogSolicitudComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
