import type {
  Authentication,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Encrypter,
  HashComparer,
  AuthenticationModel,
  GetAccountByIdRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    private readonly getAccountByIdRepository: GetAccountByIdRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<any> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)

        const fullAccount = await this.getAccountByIdRepository.getAccount(account.id)
        console.log(fullAccount)
        return { accessToken, slug: account.slug }
      }
    }
    return null
  }
}
