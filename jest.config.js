const { defaults } = require('jest-config');

module.exports = {
  testMatch: ['**/__tests__/**/*.[tj]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
