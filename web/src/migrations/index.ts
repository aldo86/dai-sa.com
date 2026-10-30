import * as migration_20261030_172836_initial from './20261030_172836_initial';

export const migrations = [
  {
    up: migration_20261030_172836_initial.up,
    down: migration_20261030_172836_initial.down,
    name: '20261030_172836_initial'
  },
];
