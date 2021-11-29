import { merge, get } from 'lodash';
import { Game } from '../../models';

import * as sharedEN from '../../../../../shared/statements/en.json';
import * as sharedRU from '../../../../../shared/statements/ru.json';
import * as sharedCN from '../../../../../shared/statements/cn.json';

import * as gta3EN from '../../../../../gta3/statements/en.json';
import * as gta3RU from '../../../../../gta3/statements/ru.json';
import * as gta3CN from '../../../../../gta3/statements/cn.json';

import * as vcEN from '../../../../../vc/statements/en.json';
import * as vcRU from '../../../../../vc/statements/ru.json';
import * as vcCN from '../../../../../vc/statements/cn.json';

import * as saEN from '../../../../../sa/statements/en.json';
import * as saRU from '../../../../../sa/statements/ru.json';
import * as saCN from '../../../../../sa/statements/cn.json';

const STATEMENTS: Record<Game, Record<string, Record<string, string>>> = {
  gta3: {
    en: merge({}, get(sharedEN, 'default'), get(gta3EN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(gta3RU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(gta3CN, 'default')),
  },
  gta3_mobile: {
    en: merge({}, get(sharedEN, 'default'), get(gta3EN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(gta3RU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(gta3CN, 'default')),
  },
  gta3_unreal: {
    en: merge({}, get(sharedEN, 'default'), get(gta3EN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(gta3RU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(gta3CN, 'default')),
  },
  vc: {
    en: merge({}, get(sharedEN, 'default'), get(vcEN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(vcRU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(vcCN, 'default')),
  },
  vc_mobile: {
    en: merge({}, get(sharedEN, 'default'), get(vcEN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(vcRU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(vcCN, 'default')),
  },
  vc_unreal: {
    en: merge({}, get(sharedEN, 'default'), get(vcEN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(vcRU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(vcCN, 'default')),
  },
  sa: {
    en: merge({}, get(sharedEN, 'default'), get(saEN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(saRU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(saCN, 'default')),
  },
  sa_mobile: {
    en: merge({}, get(sharedEN, 'default'), get(saEN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(saRU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(saCN, 'default')),
  },
  sa_unreal: {
    en: merge({}, get(sharedEN, 'default'), get(saEN, 'default')),
    ru: merge({}, get(sharedRU, 'default'), get(saRU, 'default')),
    cn: merge({}, get(sharedCN, 'default'), get(saCN, 'default')),
  },
};

export default STATEMENTS;
