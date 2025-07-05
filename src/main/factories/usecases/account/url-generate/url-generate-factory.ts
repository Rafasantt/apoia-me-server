import type { UrlGenerate } from '@/domain/usecases/generate-user-url'
import { AccountUrl } from '@/data/usecases/generate-user-url/user-url-generate'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'

export const makeGenerateUrlAccount = (): UrlGenerate => {
  const accountPostgresRepository = new AccountPostgresRepository()
  return new AccountUrl(
    accountPostgresRepository
  )
}
