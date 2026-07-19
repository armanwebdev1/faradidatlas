import * as migration_20260706_172937 from './20260706_172937';
import * as migration_20260712_162006 from './20260712_162006';
import * as migration_20260713_095125 from './20260713_095125';
import * as migration_20260717_172600 from './20260717_172600';
import * as migration_20260717_173000 from './20260717_173000';
import * as migration_20260718_100000 from './20260718_100000';
import * as migration_20260718_110000 from './20260718_110000';
import * as migration_20260718_120000 from './20260718_120000';
import * as migration_20260718_130000 from './20260718_130000';

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
  {
    up: migration_20260717_172600.up,
    down: migration_20260717_172600.down,
    name: '20260717_172600'
  },
  {
    up: migration_20260717_173000.up,
    down: migration_20260717_173000.down,
    name: '20260717_173000'
  },
  {
    up: migration_20260718_100000.up,
    down: migration_20260718_100000.down,
    name: '20260718_100000'
  },
  {
    up: migration_20260718_110000.up,
    down: migration_20260718_110000.down,
    name: '20260718_110000'
  },
  {
    up: migration_20260718_120000.up,
    down: migration_20260718_120000.down,
    name: '20260718_120000'
  },
  {
    up: migration_20260718_130000.up,
    down: migration_20260718_130000.down,
    name: '20260718_130000'
  },
  {
    up: migration_20260719_090000.up,
    down: migration_20260719_090000.down,
    name: '20260719_090000'
  },
];
