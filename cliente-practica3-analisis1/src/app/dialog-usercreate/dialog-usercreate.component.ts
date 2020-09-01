import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-dialog-usercreate',
  templateUrl: './dialog-usercreate.component.html',
  styleUrls: ['./dialog-usercreate.component.css']
})
export class DialogUsercreateComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
