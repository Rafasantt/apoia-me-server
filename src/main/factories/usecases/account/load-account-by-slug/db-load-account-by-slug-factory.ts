import { DbLoadAccountByslug } from '@/data/usecases/load-account-by-slug/bd-load-account-by-slug'
import type { LoadAccountBySlug } from '@/domain/usecases/load-account-by-slug'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'

export const makeDbLoadAccountBySlug = (): LoadAccountBySlug => {
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbLoadAccountByslug(accountPostgresRepository)
}
