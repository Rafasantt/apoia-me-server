import type {
  UrlGenerate
} from './user-url-generate-protocols'
import { randomBytes } from 'crypto'

export class AccountUrl implements UrlGenerate {
  async generate (name: string): Promise<string> {
    const baseUrl = name
      .toLowerCase()
      .replace(/\s/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    const cryptoId = randomBytes(8).toString('hex').slice(0, 12)
    const userUrl = baseUrl + cryptoId

    console.log(userUrl)

    return 'ok'
  }
}
