import type { LoadAccountByEmail, LoadAccountByEmailRepository } from './bd-load-account-by-email-protocols'

export class DbLoadAccountByEmail implements LoadAccountByEmail {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async load (email: string): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      email
    )
    if (account) {
      return account.id
    }
    return null
  }
}
