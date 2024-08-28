import { fromPairs } from 'lodash';
import { EnumRaw } from './src/app/models/index';
import { fillEnumValues } from './src/app/utils';

const { readFileSync, writeFileSync } = require('fs');

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
  
  const enums = loadFile(inFile);

  const content = Object.entries(enums).map(([name, fields]) => {
    return makeEnum(name, Object.entries(fields));
  });

  writeFileSync(outFile, content.join('\n'), {
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

  function makeEnum(name: string, fields: EnumRaw['fields']) {
    return `export const ${name} = ${JSON.stringify(
      fromPairs(fillEnumValues(fields)),
      null,
      2
    )};`;
  }
}
