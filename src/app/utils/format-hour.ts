export class FormatHour {

  public formatByMinutes (minutes: number): string{
    const sec = minutes * 60;
    return this.formatBySeconds(sec);
  }

  public formatBySeconds (sec: number): string{
    const hour  = Math.trunc(sec / 3600);
    const min = Math.trunc((sec % 3600) / 60);
    const sec2 = Math.trunc((sec % 60) );
    return this.formatHHmmSS(hour, min , sec2);
  }

  private formatHHmmSS(hour: number, min: number, sec: number): string{
    const h: string = this.toHour(hour);
    const m: string = this.toHour(min);
    const s: string = this.toHour(sec);
    return h + ':' + m + ':' + s;
  }

  private toHour(hour: number): string {
    let result = '00' ;
    if (hour < 10) {
      result = '0' + hour;
    } else {
      result = String(hour);
    }
    return result;
  }
}
