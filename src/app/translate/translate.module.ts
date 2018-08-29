import { NgModule } from '@angular/core';
import {TranslateService} from './translate.service';
import {TRANSLATION_PROVIDERS} from './translation';

import {LanguageStorageService} from '../services/language-storage.service';
import {TranslatePipe} from './translate.pipe';
import {LANG_EN_NAME} from './lang-en';

@NgModule({
  declarations: [
    TranslatePipe
      ],
  exports: [
    TranslatePipe
  ],
  providers: [
    TranslateService, TRANSLATION_PROVIDERS,
    LanguageStorageService,
    {
      provide: 'Window',
      useValue: window
    },
  ],
 })
export class TranslateModule {
  constructor(public _translate: TranslateService, private _langService: LanguageStorageService) {
    // valid initial language
    this._langService.getLanguage() == null
      ? (this._translate.use(LANG_EN_NAME), this._langService.setLanguage(LANG_EN_NAME))
      : this._translate.use(this._langService.getLanguage());
  }
}
