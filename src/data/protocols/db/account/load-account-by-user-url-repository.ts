import type { AccountModel } from '@/domain/models/account'

export interface LoadAccountByUserUrlRepository {
  loadByUrl: (userUrl: string) => Promise<AccountModel>
}
