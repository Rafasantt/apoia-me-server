import type { SlugGenerate } from '@/domain/usecases/generate-slug'
import { AccountSlug } from '@/data/usecases/generate-slug/slug-generate'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'

export const makeGenerateSlugAccount = (): SlugGenerate => {
  const accountPostgresRepository = new AccountPostgresRepository()
  return new AccountSlug(accountPostgresRepository)
}
