const { join } = require('path');
const fs = require('fs');
const { merge } = require('lodash');

const basePath = 'src/assets/i18n';
const en = require(join(__dirname, basePath, 'en.json'));
const fileList = fs.readdirSync(basePath);

for (const file of fileList) {
  if (file === 'en.json') {
    continue;
  }
  const filepath = join(__dirname, basePath, file);
  const content = require(filepath);
  const mergedContent = merge({}, en, content);
  fs.writeFileSync(filepath, JSON.stringify(mergedContent, null, 2), 'utf-8');
}
