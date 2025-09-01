import 'dotenv/config'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import type { Authentication } from '@/domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.jwtSecret, '12h')
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAuthentication(
    accountPostgresRepository,
    bcryptAdapter,
    jwtAdapter,
    accountPostgresRepository
  )
}
