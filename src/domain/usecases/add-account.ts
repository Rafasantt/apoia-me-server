import type { AccountModel } from '@/domain/models/account'

export interface AddAccountModel {
  name: string
  email: string
  role: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel | any) => Promise<AccountModel>
}
