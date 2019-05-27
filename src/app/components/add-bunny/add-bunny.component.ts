import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-add-bunny',
  templateUrl: './add-bunny.component.html',
  styleUrls: ['./add-bunny.component.scss']
})
export class AddBunnyComponent implements OnInit {

  generalMinDate = moment().subtract(15, 'years');
  todaysDate = moment();

  allIntakeReasons = [{value: 'Owner'}, {value: 'GS'}, {value: 'Outside'}, {value: 'Drop off'}, {value: 'Shelter transfer'}, {value: 'Born in Rescue'}]; // TODO : Source this from the database
  allGenders = [{value: 'Male'}, {value: 'Female'}]; // TODO : Source this from the database

  data = new FormGroup({
    name: new FormControl(''),
    surrenderName: new FormControl(''),
    gender: new FormControl(''),
    intakeDate: new FormControl(moment()),
    description: new FormControl(''),
    spayDate: new FormControl(),
    dateOfBirth: new FormControl(),
    intakeReason: new FormControl()
  });

  constructor() {

  }

  ngOnInit() {

  }

  onSubmit() {
    alert(JSON.stringify(this.data.value));
  }

}
