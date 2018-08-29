export class Masks {
  public static date_br: Array<any> = [/[0-3]/, /\d/, "/", /[0-1]/, /[0-9]/, "/", /[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
  public static date_en: Array<any> = [/[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/, "/", /[0-1]/, /[0-9]/, "/", /[0-3]/, /\d/];
  public static time: Array<any> = [/[0-2]/, /\d/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];
  public static number: Array<any> = [/\d/];
}
