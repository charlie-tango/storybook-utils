const { defaults } = require("jest-config");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testMatch: ["**/__tests__/**/*.[tj]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  testEnvironment: "jsdom",
};
