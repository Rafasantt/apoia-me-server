import type {
  Decrypter,
  DecrypterAccessToken,
  DecryptModel
} from './decrypter-access-token-protocols'

export class DecrypterToken implements DecrypterAccessToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async decrypterToken (accessToken: string): Promise<DecryptModel> {
    const accountId = await this.decrypter.decrypt(accessToken)

    if (!accountId) {
      return null
    }

    return accountId
  }
}
