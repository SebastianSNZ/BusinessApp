import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog-debitar',
  templateUrl: './dialog-debitar.component.html',
  styleUrls: ['./dialog-debitar.component.css']
})
export class DialogDebitarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
