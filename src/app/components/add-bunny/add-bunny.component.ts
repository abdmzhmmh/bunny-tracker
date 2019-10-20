import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DatabaseService } from '../../providers/DatabaseService';
import Bunny from '../../entities/Bunny';
import GENDER from '../../entities/Gender';
import RESCUE_TYPE from '../../entities/RescueType';

export interface GenderOption {
  value: GENDER;
}

export interface RescueTypeOption {
  value: RESCUE_TYPE;
}

@Component({
  selector: 'app-add-bunny',
  templateUrl: './add-bunny.component.html',
  styleUrls: ['./add-bunny.component.scss']
})
export class AddBunnyComponent implements OnInit {

  generalMinDate = moment().subtract(15, 'years');
  todaysDate = moment();

  allRescueTypes: RescueTypeOption[];
  allGenders: GenderOption[];

  data = new FormGroup({
    name: new FormControl(''),
    surrenderName: new FormControl(''),
    gender: new FormControl(''),
    intakeDate: new FormControl(moment()),
    description: new FormControl(''),
    spayDate: new FormControl(),
    dateOfBirth: new FormControl(),
    intakeReason: new FormControl(''),
    rescueType: new FormControl()
  });

  constructor(private databaseService: DatabaseService, private snackBar: MatSnackBar) {
    databaseService.getGenders().subscribe({
      next: (genders: GenderOption[]) => {
        this.allGenders = genders;
      }
    });
    databaseService.getRescueTypes().subscribe({
      next: (rescueTypeOptions: RescueTypeOption[]) => {
        this.allRescueTypes = rescueTypeOptions;
      }
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    this.databaseService.addBunny(new Bunny(
      this.data.value.name,
      this.data.value.gender.value,
      moment(this.data.value.intakeDate).toDate(),
      this.data.value.rescueType.value,
      this.data.value.intakeReason,
      undefined,
      this.data.value.surrenderName,
      moment(this.data.value.dateOfBirth).toDate(),
      this.data.value.description,
      moment(this.data.value.spayDate).toDate()
      )
    ).subscribe({
      next: (value: Bunny) => {
        this.snackBar.open(`The bunny ${value.name} saved successfully!`, undefined, {
          duration: 2000,
          panelClass: 'snackbar-message-success'
        });
        this.data.reset();
        this.data.get('intakeDate').setValue(moment());
      },
      error: (error: any) => {
        this.snackBar.open(`Failure occurred while trying to save bunny. Error was ${error}`, 'Dismiss', {
          panelClass: 'snackbar-message-failure'
        });
      }
    });
  }

}
