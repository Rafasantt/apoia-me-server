import type { LoadAccountByUserUrl, LoadAccountByUserUrlRepository } from './bd-load-account-by-user-url-protocols'

export class DbLoadAccountByUserUrl implements LoadAccountByUserUrl {
  constructor (
    private readonly loadAccountByUserUrlRepository: LoadAccountByUserUrlRepository
  ) {}

  async load (userUrl: string): Promise<string> {
    const account = await this.loadAccountByUserUrlRepository.loadByUrl(userUrl)
    if (account) {
      return account.userUrl
    }
    return null
  }
}
