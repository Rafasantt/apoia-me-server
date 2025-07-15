import type {
  LoadAccountBySlug,
  LoadAccountBySlugRepository
} from './bd-load-account-by-slug-protocols'

export class DbLoadAccountByslug implements LoadAccountBySlug {
  constructor (
    private readonly LoadAccountBySlugRepository: LoadAccountBySlugRepository
  ) {}

  async load (slug: string): Promise<string> {
    const account = await this.LoadAccountBySlugRepository.loadBySlug(slug)
    if (account) {
      return account.slug
    }
    return null
  }
}
