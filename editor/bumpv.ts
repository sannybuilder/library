import * as fs from 'fs';
import * as path from 'path';

// read folder name from args
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node bumpv <folder>');
  process.exit(1);
}

args.forEach(bump);

function bump(name: string) {
  const folder = path.join('..', name);
  if (!fs.existsSync(folder)) {
    console.error(`Folder ${folder} does not exist`);
    process.exit(1);
  }

  const versionFile = path.join(folder, 'version.txt');
  const version = fs.readFileSync(versionFile, 'utf8').trim();
  const versionParts = version.split('.');

  const major = parseInt(versionParts[0]);
  const minor = parseInt(versionParts[1]);

  const newVersion = `${major}.${minor + 1}`;

  console.log(`Bumping ${name} version from ${version} to ${newVersion}`);

  fs.writeFileSync(versionFile, newVersion);

  const jsonFile = path.join(folder, `${name}.json`);
  const json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  json.meta.version = newVersion;
  json.meta.last_update = Date.now();
  fs.writeFileSync(jsonFile, JSON.stringify(json, null, 2));
}
