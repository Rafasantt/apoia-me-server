import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import type { AddAccount } from '@/domain/usecases/add-account'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAddAccount(
    bcryptAdapter,
    accountPostgresRepository,
    accountPostgresRepository
  )
}
