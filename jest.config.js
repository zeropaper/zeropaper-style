/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.[jt]sx?$': '@swc/jest'
  },
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/utils/jest/css-module-stub.js'
  },
  setupFilesAfterEnv: ['<rootDir>/utils/jest/setup.js']
}
