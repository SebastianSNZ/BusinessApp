import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog-aprovarrechazar',
  templateUrl: './dialog-aprovarrechazar.component.html',
  styleUrls: ['./dialog-aprovarrechazar.component.css']
})
export class DialogAprovarrechazarComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
