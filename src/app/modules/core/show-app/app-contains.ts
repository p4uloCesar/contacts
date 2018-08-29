import {environment} from '../../../../environments/environment';

export class AppContains {
  public contains(apps: string[]) {
    const appName = environment.appName;
    let contains = true;
    if (apps !== undefined) {
      contains =  false;
      for (const a of  apps) {
        if (appName.toLowerCase() === a.toLowerCase()) {
          contains = true;
          break;
        }
      }
    }
    return contains;
  }
}
