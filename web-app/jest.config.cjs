module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    testPathIgnorePatterns: [
      "<rootDir>/__tests__/setup.test.ts",
      "/node_modules/",
      "/build/"
    ],
    transform: {
      "^.+\\.[t|j]sx?$": "ts-jest",
      "\\.(css|less)$": "jest-css-modules-transform"
    },
    };
  