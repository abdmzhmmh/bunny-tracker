import * as moment from 'moment';

export function translateDateToMoment(date: Date): moment.Moment {
  return date ? moment(date, 'YYYY/MM/DD HH:mm:ss.SSS') : null;
}

export function undefinedOrNull(variable?) {
  return variable === null || variable === undefined;
}

export function emptyStringOrNullOrUndefined(variable?: string) {
  return variable === null || variable === undefined || variable === '';
}
