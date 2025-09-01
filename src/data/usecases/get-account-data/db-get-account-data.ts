import type {
  AccountWithDonationsModel,
  Decrypter,
  GetAccountByIdRepository,
  GetAccountData
} from './db-get-account-data-protocols'

export class DbAGetAccountData implements GetAccountData {
  constructor (
    private readonly encrypter: Decrypter,
    private readonly getAccountByIdRepository: GetAccountByIdRepository
  ) {}

  async getData (accessToken: string): Promise<AccountWithDonationsModel> {
    const tokenData = await this.encrypter.decrypt(accessToken)
    if (tokenData) {
      const fullAccount = await this.getAccountByIdRepository.getAccount(tokenData.id)
      // const { role, password, ...data } = fullAccount
      return fullAccount
    }
    return null
  }
}
