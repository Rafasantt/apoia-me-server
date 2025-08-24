import type { Config } from 'jest'

const config: Config = {

  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/data/usecases/add-account/bd-add-account-protocols.ts',
    '!<rootDir>/src/presentation/controllers/signup/signup-protocols.ts',
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
