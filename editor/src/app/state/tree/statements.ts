import { merge, get } from 'lodash';
import { Game } from '../../models';

import * as sharedEN from '../../../../../shared/statements/en.json';
import * as sharedRU from '../../../../../shared/statements/ru.json';
import * as sharedCN from '../../../../../shared/statements/cn.json';
import * as sharedBN from '../../../../../shared/statements/bn.json';

import * as gta3EN from '../../../../../gta3/statements/en.json';
import * as gta3RU from '../../../../../gta3/statements/ru.json';
import * as gta3CN from '../../../../../gta3/statements/cn.json';
import * as gta3BN from '../../../../../gta3/statements/bn.json';

import * as vcEN from '../../../../../vc/statements/en.json';
import * as vcRU from '../../../../../vc/statements/ru.json';
import * as vcCN from '../../../../../vc/statements/cn.json';
import * as vcBN from '../../../../../vc/statements/bn.json';

import * as saEN from '../../../../../sa/statements/en.json';
import * as saRU from '../../../../../sa/statements/ru.json';
import * as saCN from '../../../../../sa/statements/cn.json';
import * as saBN from '../../../../../sa/statements/bn.json';

const getStatements = (en: object, ru: object, cn: object, bn: object) => ({
  en: merge({}, get(sharedEN, 'default'), get(en, 'default')),
  ru: merge({}, get(sharedRU, 'default'), get(ru, 'default')),
  cn: merge({}, get(sharedCN, 'default'), get(cn, 'default')),
  bn: merge({}, get(sharedBN, 'default'), get(bn, 'default')),
});

const gta3Statements = getStatements(gta3EN, gta3RU, gta3CN, gta3BN);
const vcStatements = getStatements(vcEN, vcRU, vcCN, vcBN);
const saStatements = getStatements(saEN, saRU, saCN, saBN);

const STATEMENTS: Record<Game, Record<string, Record<string, string>>> = {
  gta3: gta3Statements,
  gta3_mobile: gta3Statements,
  gta3_unreal: gta3Statements,
  vc: vcStatements,
  vc_mobile: vcStatements,
  vc_unreal: vcStatements,
  sa: saStatements,
  sa_mobile: saStatements,
  sa_unreal: saStatements,
};

export default STATEMENTS;
