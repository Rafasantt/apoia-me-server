export interface LoadAccountBySlug {
  load: (slug: string) => Promise<string>
}
