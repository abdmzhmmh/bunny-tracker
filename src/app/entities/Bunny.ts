import GENDER from './Gender';
import RESCUE_TYPE from './RescueType';

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
}
