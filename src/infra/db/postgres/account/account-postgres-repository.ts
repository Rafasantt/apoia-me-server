import type { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import type { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import type { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import type { AccountModel, AccountWithDonationsModel } from '@/domain/models/account'
import type { AddAccountModel } from '@/domain/usecases/add-account'
import type { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import type { LoadAccountBySlugRepository } from '@/data/usecases/load-account-by-slug/bd-load-account-by-slug-protocols'
import type { GetAccountByIdRepository } from '@/data/usecases/authentication/db-authentication-protocols'
import { AppDataSource } from '../data-source/data-source'

export class AccountPostgresRepository implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository,
    LoadAccountBySlugRepository,
    GetAccountByIdRepository {
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

  async loadBySlug (slug: string): Promise<AccountModel> {
    const accountRepository = AppDataSource.getRepository('accounts')
    const account = (await accountRepository.findOne({
      where: { slug }
    })) as AccountModel
    return account || null
  }

  async getAccount (id: string): Promise<AccountWithDonationsModel> {
    const accountRepository = AppDataSource.getRepository('accounts')
    const account = (await accountRepository.findOne({
      where: { id },
      relations: { donations: true }
    })) as AccountWithDonationsModel
    return account || null
  }
}
