import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};

export default config;
