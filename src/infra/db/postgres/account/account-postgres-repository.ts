import type { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import type { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import type { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import type { AccountModel } from '@/domain/models/account'
import type { AddAccountModel } from '@/domain/usecases/add-account'
import type { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { AppDataSource } from '../data-source/data-source'
import type { LoadByTokenForgotPasswordRepository } from '@/data/protocols/db/account/load-by-token-forgot-password-repository'

export class AccountPostgresRepository
implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository,
    LoadByTokenForgotPasswordRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountRepository = AppDataSource.getRepository('accounts')
    const accountToBeInserted = accountRepository.create(accountData)
    const result = await accountRepository.save(accountToBeInserted)
    const account = Object.assign({}, accountData, { id: result.id })
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountRepository = AppDataSource.getRepository('accounts')
    const account = (await accountRepository.findOne({
      where: { email }
    })) as AccountModel
    return account || null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountRepository = AppDataSource.getRepository('accounts')
    await accountRepository.update(id, { accessToken: token })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    const accountRepository = AppDataSource.getRepository('accounts')
    const account = (await accountRepository.findOne({
      where: [
        { accessToken: token, role },
        { accessToken: token, role: 'admin' }
      ]
    })) as AccountModel
    return account || null
  }

  async loadByTokenPassword (token: string): Promise<boolean> {
    const accountRepository = AppDataSource.getRepository('accounts')
    const account = await accountRepository.findOne({
      where: { recoveryToken: token }
    }) as AccountModel
    if (account) {
      return true
    }
    return null
  }
}
