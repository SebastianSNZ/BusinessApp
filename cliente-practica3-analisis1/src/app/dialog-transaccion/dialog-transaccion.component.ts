import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog-transaccion',
  templateUrl: './dialog-transaccion.component.html',
  styleUrls: ['./dialog-transaccion.component.css']
})
export class DialogTransaccionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
