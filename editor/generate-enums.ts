import { fromPairs } from 'lodash';
import { EnumRaw } from './src/app/models/index';
import { fillEnumValues } from './src/app/utils';

const { readFileSync, writeFileSync } = require('fs');

// outfile without extension
export function run(inFile: string, outFile: string) {
  if (!inFile) {
    console.error('specify the input file');
    process.exit(1);
  }

  if (!outFile) {
    console.error('specify the path to the output file');
    process.exit(1);
  }

  console.log(`Generating enums from ${inFile}`);

  const enums = Object.entries(loadFile(inFile));

  const contentJs = enums.map(([name, fields]) =>
    makeJsEnum(name, Object.entries(fields)),
  );
  const contentTs = enums.map(([name, fields]) =>
    makeTsEnum(name, Object.entries(fields)),
  );

  writeFileSync(outFile + '.js', contentJs.join('\n'), {
    encoding: 'utf8',
  });
  writeFileSync(outFile + '.ts', contentTs.join('\n'), {
    encoding: 'utf8',
  });

  function loadFile(path: string) {
    const file = readFileSync(path);
    const content: Record<
      string,
      Record<string, null | number | string>
    > = JSON.parse(file);

    return content;
  }

  function makeJsEnum(name: string, fields: EnumRaw['fields']) {
    return `export const ${name} = ${JSON.stringify(
      fromPairs(fillEnumValues(fields)),
      null,
      2,
    )};`;
  }

  function makeTsEnum(name: string, fields: EnumRaw['fields']) {
    return `export enum ${name} ${JSON.stringify(
      fromPairs(fillEnumValues(fields)),
      null,
      2,
    ).replace(/:/g, ' =')};`;
  }
}
