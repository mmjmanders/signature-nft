/* eslint-disable */
export default {
  displayName: 'signature-svg-generator',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    '^(d3-.*)$': '<rootDir>/../../node_modules/$1/dist/$1.min.js',
  },
  coverageDirectory: '../../coverage/libs/signature-svg-generator',
};
