export default {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@/(.*)$': '<rootDir>/src/$1',

    // Mocking assets and styling
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test/mocks/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/src/test/mocks/styleMock.ts',

    // Mock individual files in models and services folder
    '^models/(.*)$': '<rootDir>/src/test/mocks/fileMock.js',
    '^services/(.*)$': '<rootDir>/src/test/mocks/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'css'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
} as const;
