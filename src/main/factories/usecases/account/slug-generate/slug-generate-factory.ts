import type { SlugGenerate } from '@/domain/usecases/generate-user-url'
import { AccountSlug } from '@/data/usecases/generate-slug/slug-generate'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'

export const makeGenerateSlugAccount = (): SlugGenerate => {
  const accountPostgresRepository = new AccountPostgresRepository()
  return new AccountSlug(accountPostgresRepository)
}
