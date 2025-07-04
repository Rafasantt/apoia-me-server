import type { UrlGenerate } from '@/domain/usecases/generate-user-url'
import { AccountUrl } from '@/data/usecases/generate-user-url/user-url-generate'

export const makeGenerateUrlAccount = (): UrlGenerate => {
  return new AccountUrl()
}
