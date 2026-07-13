import * as migration_20260706_172937 from './20260706_172937';
import * as migration_20260712_162006 from './20260712_162006';
import * as migration_20260713_095125 from './20260713_095125';

export const migrations = [
  {
    up: migration_20260706_172937.up,
    down: migration_20260706_172937.down,
    name: '20260706_172937',
  },
  {
    up: migration_20260712_162006.up,
    down: migration_20260712_162006.down,
    name: '20260712_162006',
  },
  {
    up: migration_20260713_095125.up,
    down: migration_20260713_095125.down,
    name: '20260713_095125'
  },
];
