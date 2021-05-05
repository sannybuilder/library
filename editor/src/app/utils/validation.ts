import { Attribute, Command } from '../models';
import { commandParams } from './command';

const SELF = 'self';

export const ATTRIBUTE_RULES: Partial<
  Record<Attribute, { allowed?: Attribute[]; disallowed?: Attribute[] }>
> = {
  is_unsupported: { allowed: [] },
  is_constructor: { disallowed: ['is_destructor'] },
  is_nop: { allowed: ['is_condition', 'is_static'] },
  is_keyword: { disallowed: ['is_constructor', 'is_destructor', 'is_static'] },
};

export function isAnyAttributeInvalid(command: Command): boolean {
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

export function hasDuplicateNameError(
  command: Command,
  otherCommands: Command[] | undefined
) {
  return (otherCommands ?? []).some(
    ({ name, id }) => name === command.name && id !== command.id
  );
}

export function isParamNameDuplicate(command: Command, name: string) {
  return (
    !!name &&
    commandParams(command).filter((param) => param.name === name).length > 1
  );
}

export function hasDuplicateParamNameError(command: Command) {
  return commandParams(command).some((param) =>
    isParamNameDuplicate(command, param.name)
  );
}

export function hasNoOutputParamsError(command: Command) {
  return !!command.attrs?.is_constructor && !command.output?.length;
}

export function hasEmptyNameError(command: Command) {
  return !command.name;
}

export function hasEmptyOpcodeError(command: Command) {
  return !command.id;
}

export function hasSelfInStaticMethod(command: Command) {
  return (
    !!command.attrs?.is_static &&
    commandParams(command).some((p) => p.name === SELF)
  );
}

export function hasMissingSelfParamInMethod(command: Command) {
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
    num_params > 0 &&
    !commandParams(command).some((p) => p.name === SELF)
  );
}
