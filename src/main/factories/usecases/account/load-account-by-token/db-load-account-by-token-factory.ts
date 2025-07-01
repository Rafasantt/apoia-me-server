import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'
import type { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'
import 'dotenv/config'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.jwtSecret, '12h')
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPostgresRepository)
}
