import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'
import { DbAGetAccountData } from '@/data/usecases/get-account-data/db-get-account-data'
import type { GetAccountData } from '@/domain/usecases/get-account-data'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'

export const makeDbGetAccountData = (): GetAccountData => {
  const jwtAdapter = new JwtAdapter(process.env.jwtSecret, '12h')
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAGetAccountData(
    jwtAdapter,
    accountPostgresRepository
  )
}
