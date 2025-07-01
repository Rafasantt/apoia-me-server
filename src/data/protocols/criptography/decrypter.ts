import type { DecryptModel } from '@/domain/models/decrypt'

export interface Decrypter {
  decrypt: (value: string) => Promise<DecryptModel>
}
