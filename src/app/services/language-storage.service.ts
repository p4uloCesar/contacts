import {Injectable, Inject} from "@angular/core";
import {MAT_DATE_LOCALE} from "@angular/material";

@Injectable()
export class LanguageStorageService {

  private static LANGUAGE_STORAGE: string = "LANGUAGE_STORAGE";

  constructor(@Inject("Window") private _window: Window) {
  }

  public setLanguage(lang: string): void {
    if (this._window.localStorage) {
      this._window.localStorage.setItem(LanguageStorageService.LANGUAGE_STORAGE, lang);
    }
  }

  public getLanguage(): string {
    if (!this._window.localStorage) {
      return null;
    }

    let language: string;

    try {
      language = this._window.localStorage.getItem(LanguageStorageService.LANGUAGE_STORAGE);
    } finally {
      if (!language) {
        this.invalidate();
      }
    }
    return language;
  }

  public invalidate(): void {
    if (this._window.localStorage) {
      this._window.localStorage.removeItem(LanguageStorageService.LANGUAGE_STORAGE);
    }
  }

}
