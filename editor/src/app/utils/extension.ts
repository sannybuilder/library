import { last } from 'lodash';
import {
  Extension,
  ClassMeta,
  Entity,
  DEFAULT_EXTENSION,
  Command,
  Game,
  ViewContext,
} from '../models';
import { primitiveTypes } from './command';

export function getEntities(
  extensions: Extension[],
  classesMeta: ClassMeta[] | undefined,
  game: Game,
  viewContext: ViewContext
): Record<string, Entity[]> {
  const defaultEntities =
    extensions
      .find((e) => e.name === DEFAULT_EXTENSION)
      ?.commands.reduce((m, command: Command) => {
        if (command.attrs?.is_constructor) {
          const name = last(command.output)?.type;
          if (name) {
            m.add(name);
          }
        }
        return m;
      }, new Set<string>()) ?? new Set();

  const primitives: string[] = primitiveTypes(game, viewContext);

  return extensions.reduce((m, e) => {
    const dynamicClasses = new Set<string>();
    const staticClasses = new Set<string>();
    for (const command of e.commands) {
      if (command.attrs?.is_constructor) {
        const name = last(command.output)?.type;
        if (name && !primitives.includes(name)) {
          dynamicClasses.add(name);
        }
      } else if (command.class) {
        if (
          defaultEntities.has(command.class) ||
          classesMeta?.find((m) => m.name === command.class && m.constructable)
        ) {
          dynamicClasses.add(command.class);
        } else {
          staticClasses.add(command.class);
        }
      }
    }

    const dynamicClassesArray = [...dynamicClasses].sort();
    const staticClassesArray = [...staticClasses]
      .filter((name) => !dynamicClassesArray.includes(name))
      .sort();
    (m[e.name] ??= []).push(
      ...dynamicClassesArray.map(
        (name) => ({ name, type: 'dynamic' } as Entity)
      ),
      ...staticClassesArray.map((name) => ({ name, type: 'static' } as Entity))
    );
    return m;
  }, {} as Record<string, Entity[]>);
}
