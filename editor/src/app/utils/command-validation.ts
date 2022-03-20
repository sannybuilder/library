import { intersection } from 'lodash';
import {
  Attribute,
  Command,
  Param,
  Platform,
  PrimitiveType,
  Version,
} from '../models';
import { commandParams, inputParams, outputParams } from './command';

const SELF = 'self';

export const ATTRIBUTE_RULES: Partial<
  Record<Attribute, { allowed?: Attribute[]; disallowed?: Attribute[] }>
> = {
  is_unsupported: { allowed: [] },
  is_constructor: { disallowed: ['is_destructor'] },
  is_nop: { allowed: ['is_condition', 'is_static'] },
  is_keyword: { disallowed: ['is_constructor', 'is_destructor', 'is_static'] },
};

export function doesCommandHaveAnyAttributeInvalid(command: Command): boolean {
  const entries = Object.entries(command.attrs ?? {}) as [Attribute, boolean][];

  return !entries.reduce((m, [k, v]) => {
    // no rule for attribute or attribute is not enabled => skip
    if (!v || !ATTRIBUTE_RULES[k]) {
      return m;
    }

    // all other enabled attributes
    const other = entries.filter(([_k, _v]) => _k !== k && _v);
    const allowed = ATTRIBUTE_RULES[k]?.allowed;
    const disallowed = ATTRIBUTE_RULES[k]?.disallowed;

    // check if all enabled attributes allowed to pair with current attributes
    const isAllowedValid =
      !allowed || other.every(([_k]) => allowed.includes(_k));
    const isDisallowedValid =
      !disallowed || !other.some(([_k]) => disallowed.includes(_k));
    return m && isAllowedValid && isDisallowedValid;
  }, true);
}

export function doesCommandHaveDuplicateName(
  command: Command,
  otherCommands: Command[] | undefined
) {
  const thisCommandPlatforms = command.platforms ?? [Platform.Any];
  const thisCommandVersions = command.versions ?? [Version.Any];

  return (otherCommands ?? []).some(
    ({ name, id, platforms, versions }) =>
      name === command.name &&
      id !== command.id &&
      intersection(thisCommandPlatforms, platforms ?? [Platform.Any]).length >
        0 &&
      intersection(thisCommandVersions, versions ?? [Version.Any]).length > 0 &&
      !command.attrs?.is_overload
  );
}

export function isCommandParamNameDuplicate(command: Command, name: string) {
  const f = (p: Param) => p.name === name;
  const hasDups = (items: Param[]) => items.filter(f).length > 1;
  return (
    !!name && (hasDups(inputParams(command)) || hasDups(outputParams(command)))
  );
}

export function doesCommandHaveDuplicateParamName(command: Command) {
  return commandParams(command).some((param) =>
    isCommandParamNameDuplicate(command, param.name)
  );
}

export function doesConstructorCommandHaveNoOutputParams(command: Command) {
  return !!command.attrs?.is_constructor && !command.output?.length;
}

export function doesCommandHaveEmptyName(command: Command) {
  return !command.name;
}

export function doesCommandHaveEmptyId(command: Command) {
  return !command.id;
}

export function doesCommandHaveSelfInStaticMethod(command: Command) {
  return (
    !!command.attrs?.is_static &&
    commandParams(command).some((p) => p.name === SELF)
  );
}

export function doesCommandHaveMissingSelfParamInMethod(command: Command) {
  const { is_static, is_keyword, is_nop, is_unsupported, is_constructor } =
    command.attrs ?? {};
  const { class: className, member, num_params } = command;
  return (
    !is_static &&
    !is_keyword &&
    !is_nop &&
    !is_unsupported &&
    !is_constructor &&
    !!className &&
    !!member &&
    (!num_params || !commandParams(command).some((p) => p.name === SELF))
  );
}

export function doesCommandDescriptionHaveTrailingPeriod(command: Command) {
  return !!command.short_desc?.endsWith('.');
}

export function doesCommandDescriptionNotStartWith3rdPersonVerb(
  command: Command
) {
  return (
    !!command.short_desc && !command.short_desc?.split(' ')[0]?.endsWith('s')
  );
}

export function doesConstructorNotReturnHandle(command: Command) {
  const hasSingleParamHandle =
    command.output?.length === 1 && command.output[0].name === 'handle';

  return !!command.attrs?.is_constructor && !hasSingleParamHandle;
}

export function doesVariadicCommandNotHaveArgumentsParameter(command: Command) {
  return (
    !!command.attrs?.is_variadic &&
    !commandParams(command).some((p) => p.type === PrimitiveType.arguments)
  );
}
