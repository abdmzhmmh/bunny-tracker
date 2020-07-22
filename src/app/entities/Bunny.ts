import GENDER from './Gender';
import RESCUE_TYPE from './RescueType';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import DATE_OF_BIRTH_EXPLANATION from './DateOfBirthExplanation';
import SPAY_EXPLANATION from './SpayExplanation';

export default class Bunny {
  constructor(
    public name: string,
    public gender: GENDER,
    public intakeDate: Date,
    public rescueType: RESCUE_TYPE,
    public intakeReason: string,
    public bondedBunnyIds: number[],
    public dateOfBirthExplanation?: DATE_OF_BIRTH_EXPLANATION,
    public id?: number,
    public surrenderName?: string,
    public dateOfBirth?: Date,
    public description?: string,
    public spayDate?: Date,
    public passedAwayDate?: Date,
    public passedAwayReason?: string,
    public spayExplanation?: SPAY_EXPLANATION
  ) {

  }

  public static from(formGroup: FormGroup, id: number): Bunny {
    const hasBondedBunnyControl: boolean = formGroup.controls.bondedBunnies != null;
    return new Bunny(
      formGroup.controls.name.value,
      formGroup.controls.gender.value,
      formGroup.controls.intakeDate.value ? moment(formGroup.controls.intakeDate.value).startOf('day').toDate() : null,
      formGroup.controls.rescueType.value,
      formGroup.controls.intakeReason.value,
      hasBondedBunnyControl ? (formGroup.controls.bondedBunnies.value ? formGroup.controls.bondedBunnies.value.map((bunnyBondOption: string) => {
        return Number.parseInt(bunnyBondOption, 10);
      }) : []) : [],
      formGroup.controls.dateOfBirth.value ? formGroup.controls.dateOfBirthExplanation.value : null, // Ignore the value unless the date was set
      id,
      formGroup.controls.surrenderName.value,
      formGroup.controls.dateOfBirth.value ? moment(formGroup.controls.dateOfBirth.value).startOf('day').toDate() : null,
      formGroup.controls.description.value,
      formGroup.controls.spayDate.value ? moment(formGroup.controls.spayDate.value).startOf('day').toDate() : null,
      formGroup.controls.passedAwayDate ? (formGroup.controls.passedAwayDate.value ? moment(formGroup.controls.passedAwayDate.value).startOf('day').toDate() : null) : null,
      formGroup.controls.passedAwayReason ? (formGroup.controls.passedAwayReason.value) : null,
      formGroup.controls.spayDate.value ? formGroup.controls.spayExplanation.value : null, // Ignore the value unless the date was set
    );
  }
}
