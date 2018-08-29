import { NgModule } from '@angular/core';
import {TranslatePipe} from './translate.pipe';
import {TranslateService} from './translate.service';
import {TRANSLATION_PROVIDERS} from './translation';
import {LANG_EN_NAME} from './lang-en';
import {LanguageStorageService} from '../services/language-storage.service';

@NgModule({
  declarations: [
    TranslatePipe
      ],
  exports: [
    TranslatePipe
  ],
  providers: [
    TranslateService, TRANSLATION_PROVIDERS,
    {
      provide: 'Window',
      useValue: window
    },
    LanguageStorageService
  ],
 })
export class TranslateModule {
  constructor(public _translate: TranslateService, private _langService: LanguageStorageService) {
    this._langService.getLanguage() == null
      ? (this._translate.use(LANG_EN_NAME), this._langService.setLanguage(LANG_EN_NAME))
      : this._translate.use(this._langService.getLanguage());
  }
}
