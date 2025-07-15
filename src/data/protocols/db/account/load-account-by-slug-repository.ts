import type { AccountModel } from '@/domain/models/account'

export interface LoadAccountBySlugRepository {
  loadBySlug: (slug: string) => Promise<AccountModel>
}
