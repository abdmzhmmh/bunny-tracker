import GENDER from './Gender';
import RESCUE_TYPE from './RescueType';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export default class Bunny {
  constructor(
    public name: string,
    public gender: GENDER,
    public intakeDate: Date,
    public rescueType: RESCUE_TYPE,
    public intakeReason: string,
    public id?: number,
    public surrenderName?: string,
    public dateOfBirth?: Date,
    public description?: string,
    public spayDate?: Date,
    public passedAwayDate?: Date
  ) {

  }

  public static from(formGroup: FormGroup, id: number): Bunny {
    return new Bunny(
      formGroup.controls.name.value,
      formGroup.controls.gender.value,
      formGroup.controls.intakeDate.value ? moment(formGroup.controls.intakeDate.value).startOf('day').toDate() : null,
      formGroup.controls.rescueType.value,
      formGroup.controls.intakeReason.value,
      id,
      formGroup.controls.surrenderName.value,
      formGroup.controls.dateOfBirth.value ? moment(formGroup.controls.dateOfBirth.value).startOf('day').toDate() : null,
      formGroup.controls.description.value,
      formGroup.controls.spayDate.value ? moment(formGroup.controls.spayDate.value).startOf('day').toDate() : null,
      formGroup.controls.passedAwayDate.value ? moment(formGroup.controls.passedAwayDate.value).startOf('day').toDate() : null
    );
  }
}
