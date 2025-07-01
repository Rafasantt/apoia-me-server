import type { DecryptModel } from '@/domain/models/decrypt'

export interface DecrypterAccessToken {
  decrypterToken: (accessToken: string) => Promise<DecryptModel>
}
