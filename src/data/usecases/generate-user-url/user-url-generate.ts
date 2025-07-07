import type {
  LoadAccountByUserUrlRepository,
  UrlGenerate
} from './user-url-generate-protocols'
import { randomBytes } from 'crypto'

export class AccountUrl implements UrlGenerate {
  constructor (
    private readonly loadAccountByUserUrlRepository: LoadAccountByUserUrlRepository
  ) {}

  private normalizeName (name: string): string {
    return name
      .toLowerCase()
      .replace(/\s/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }

  private generateRandomId (): string {
    return randomBytes(8).toString('hex').slice(0, 12)
  }

  async generate (name: string): Promise<string> {
    const baseUrl = this.normalizeName(name)
    let userUrl: string
    let existinUser = null

    do {
      const cryptoId = this.generateRandomId()
      userUrl = `${baseUrl}${cryptoId}`
      existinUser = await this.loadAccountByUserUrlRepository.loadByUrl(userUrl)
    } while (existinUser)

    return userUrl
  }
}
