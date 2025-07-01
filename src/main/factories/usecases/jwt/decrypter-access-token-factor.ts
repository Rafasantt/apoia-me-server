import 'dotenv/config'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { DecrypterToken } from '@/data/usecases/decrypter-access-token/decrypter-access-token'
import type { DecrypterAccessToken } from '@/domain/usecases/decrypter-access-token'

export const makeDecrypterAccessToken = (): DecrypterAccessToken => {
  const jwtAdapter = new JwtAdapter(process.env.jwtSecret, '12h')
  return new DecrypterToken(
    jwtAdapter
  )
}
