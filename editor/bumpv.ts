import { bump } from './bump';

// read folder name from args
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node bumpv <folder>');
  process.exit(1);
}

args.forEach(bump);
