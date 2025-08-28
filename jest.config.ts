import type { Config } from 'jest'

const config: Config = {

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/presentation/protocols/**',
    '!<rootDir>/src/infra/db/postgres/migrations/**',
    '!<rootDir>/src/presentation/protocols/index.ts'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  roots: ['<rootDir>/src'],
}

export default config
