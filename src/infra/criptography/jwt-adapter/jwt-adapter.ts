import Jwt from 'jsonwebtoken'
import type { Encrypter } from '@/data/protocols/criptography/encrypter'
import type { Decrypter } from '@/data/protocols/criptography/decrypter'
import type { DecryptModel } from '@/domain/models/decrypt'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (
    private readonly secret: string,
    private readonly validity: string
  ) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = Jwt.sign({ id: value }, this.secret, { expiresIn: this.validity })
    return accessToken
  }

  async decrypt (token: string): Promise<DecryptModel> {
    const value: any = Jwt.verify(token, this.secret)
    return value
  }
}
