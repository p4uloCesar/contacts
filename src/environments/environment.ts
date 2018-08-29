// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.mms.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


import {LANG_EN_TRANS_SPECIFIC} from '../app/translate/mms/lang-en';
import {LANG_PT_TRANS_SPECIFIC} from '../app/translate/mms/lang-pt';

export const environment = {
  production: false,
  api: '/api/mms/', // TODO consertar o environment de dev que vai para prod
  appName: 'MMS',
  portWebSocket: '',
  LANG_EN_TRANS_SPECIFIC: LANG_EN_TRANS_SPECIFIC,
  LANG_PT_TRANS_SPECIFIC: LANG_PT_TRANS_SPECIFIC,
};
