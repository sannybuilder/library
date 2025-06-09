export function compile(input: string) {
  const commands = input
    .split('\n')
    .map((line) => parse(line))
    .filter((cmd) => cmd !== undefined);

  return commands;
}

const POOL_SIZE = 64;

interface Command {
  name: string;
  arguments: number[];
}

export interface CNodesSwitchedOnOrOff {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
  isOff: boolean;
  isCars: boolean;
}

function parse(input: string): Command | undefined {
  let trimmed = input.trim().toLowerCase();

  let buf = '';
  let inComment = false;
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (char === '{') {
      inComment = true;
    } else if (char === '}') {
      inComment = false;
    } else if (!inComment) {
      if (char === '/' && trimmed[i + 1] === '/') {
        break;
      }
      buf += char;
    }
  }

  if (buf.length === 0) {
    return;
  }

  let command = {} as Command;

  const commandMap = {
    '01e7:': 'switch_roads_on',
    '01e8:': 'switch_roads_off',
    '091d:': 'switch_roads_back_to_original',
    '091e:': 'switch_ped_roads_back_to_original',
    '022a:': 'switch_ped_roads_on',
    '022b:': 'switch_ped_roads_off',
    switch_roads_on: 'switch_roads_on',
    switch_roads_off: 'switch_roads_off',
    switch_roads_back_to_original: 'switch_roads_back_to_original',
    switch_ped_roads_back_to_original: 'switch_ped_roads_back_to_original',
    switch_ped_roads_on: 'switch_ped_roads_on',
    switch_ped_roads_off: 'switch_ped_roads_off',
  };

  for (const [id, name] of Object.entries(commandMap)) {
    let [res, next] = strTok(buf, id);
    if (res) {
      command.name = name;
      buf = next.trim();
      break;
    }
  }

  const args = buf.split(/\s+/);
  command.arguments = args
    .map((arg) => {
      const num = parseFloat(arg);
      if (isNaN(num)) {
        return null;
      }
      return num;
    })
    .filter((arg) => arg !== null);

  return command;
}

function strTok(s: string, tok: string): [boolean, string] {
  if (s.startsWith(tok)) {
    return [true, s.substring(tok.length).trim()];
  }
  return [false, s];
}

export function execute(
  commands: Command[],
  options: { patched: boolean },
  pool: CNodesSwitchedOnOrOff[]
) {
  for (const cmd of commands) {
    const [xA, yA, zA] = cmd.arguments.slice(0, 3);
    const [xB, yB, zB] = cmd.arguments.slice(3, 6);
    const xMin = Math.min(xA, xB);
    const xMax = Math.max(xA, xB);
    const yMin = Math.min(yA, yB);
    const yMax = Math.max(yA, yB);
    const zMin = Math.min(zA, zB);
    const zMax = Math.max(zA, zB);
    switch (cmd.name) {
      case 'switch_roads_on':
        SwitchRoadsOffInArea(
          pool,
          options,
          xMin,
          xMax,
          yMin,
          yMax,
          zMin,
          zMax,
          false,
          true,
          false
        );
        break;
      case 'switch_roads_off':
        SwitchRoadsOffInArea(
          pool,
          options,
          xMin,
          xMax,
          yMin,
          yMax,
          zMin,
          zMax,
          true,
          true,
          false
        );
        break;
      case 'switch_roads_back_to_original':
        SwitchRoadsOffInArea(
          pool,
          options,
          xMin,
          xMax,
          yMin,
          yMax,
          zMin,
          zMax,
          false,
          true,
          true
        );
        break;
      case 'switch_ped_roads_on':
        SwitchRoadsOffInArea(
          pool,
          options,
          xMin,
          xMax,
          yMin,
          yMax,
          zMin,
          zMax,
          false,
          false,
          false
        );
        break;
      case 'switch_ped_roads_off':
        SwitchRoadsOffInArea(
          pool,
          options,
          xMin,
          xMax,
          yMin,
          yMax,
          zMin,
          zMax,
          true,
          false,
          false
        );
        break;
      case 'switch_ped_roads_back_to_original':
        SwitchRoadsOffInArea(
          pool,
          options,
          xMin,
          xMax,
          yMin,
          yMax,
          zMin,
          zMax,
          false,
          false,
          true
        );
        break;
    }
  }
}

function SwitchRoadsOffInArea(
  pool: CNodesSwitchedOnOrOff[],
  options: { patched: boolean },
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  zMin: number,
  zMax: number,
  bSwitchOff: boolean,
  bCars: boolean,
  bBackToOriginal: boolean
) {
  for (let i = 0; i < pool.length; i++) {
    const area = pool[i];
    // If the existing area is completely inside the area we are switching off, remove it
    if (
      area.xMin < xMin ||
      area.yMin < yMin ||
      area.zMin < zMin ||
      area.xMax > xMax ||
      area.yMax > yMax ||
      area.zMax > zMax
    ) {
      continue;
    }

    // Remove the area from the pool

    for (let j = i; j < pool.length - 1; j++) {
      // Shift the area to the left
      if (options.patched) {
        pool[j] = pool[j + 1];
      } else {
        // R* bug, they messed up with the index
        pool[i] = pool[i + 1];
      }
    }

    pool.pop(); // Remove the last element, which is now a duplicate

    i--;
  }

  if (!bBackToOriginal && pool.length < POOL_SIZE) {
    pool.push({
      xMin,
      xMax,
      yMin,
      yMax,
      zMin,
      zMax,
      isOff: bSwitchOff,
      isCars: bCars,
    });
  }
}
