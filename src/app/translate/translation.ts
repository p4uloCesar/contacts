import {InjectionToken} from '@angular/core';

/*import translations*/
import {environment} from '../../environments/environment';
import {LANG_EN_NAME, LANG_EN_TRANS} from './lang-en';
import {LANG_PT_NAME, LANG_PT_TRANS} from './lang-pt';



/*translation token*/
export const TRANSLATIONS = new InjectionToken('translations');

/*all translations*/
const dictionary = {};
const LANG_EN_TRANS_MERGED = Object.assign(LANG_EN_TRANS, environment.LANG_EN_TRANS_SPECIFIC);;
const LANG_PT_TRANS_MERGED = Object.assign(LANG_PT_TRANS, environment.LANG_PT_TRANS_SPECIFIC);;


dictionary[LANG_EN_NAME] = LANG_EN_TRANS_MERGED;
dictionary[LANG_PT_NAME] = LANG_PT_TRANS_MERGED;


/* providers */
export const TRANSLATION_PROVIDERS = [
  {provide: TRANSLATIONS, useValue: dictionary}
];
