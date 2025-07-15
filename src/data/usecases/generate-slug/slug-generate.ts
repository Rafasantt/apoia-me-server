import type {
  LoadAccountBySlugRepository,
  SlugGenerate
} from './slug-generate-protocols'
import { randomBytes } from 'crypto'

export class AccountSlug implements SlugGenerate {
  constructor (
    private readonly LoadAccountBySlugRepository: LoadAccountBySlugRepository
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
    const baseSlug = this.normalizeName(name)
    let slug: string
    let existinUser = null

    do {
      const cryptoId = this.generateRandomId()
      slug = `${baseSlug}${cryptoId}`
      existinUser = await this.LoadAccountBySlugRepository.loadBySlug(slug)
    } while (existinUser)

    return slug
  }
}
