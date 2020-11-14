import * as moment from 'moment-timezone';

export class DateTime {
  public static getUtcDateTime() {
    moment.tz.setDefault('UTC');
    return moment.tz().format();
  }
}
