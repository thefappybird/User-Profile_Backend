import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
export default {
  roots: ["<rootDir>/dist/tests"], // point to compiled test files
  testEnvironment: "node",
  transform: {},
};
