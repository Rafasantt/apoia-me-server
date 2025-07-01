import { DecrypterToken } from './decrypter-access-token'
import type {
  Decrypter,
  DecryptModel
} from './decrypter-access-token-protocols'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<DecryptModel> {
      return await new Promise(resolve => {
        resolve(makeFakeDecryptData())
      })
    }
  }
  return new DecrypterStub()
}

const makeFakeDecryptData = (): DecryptModel => ({
  id: 'valid_id',
  iat: 1234,
  exp: 4321
})

interface SutTypes {
  sut: DecrypterToken
  decrypterStub: Decrypter
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DecrypterToken(
    decrypterStub
  )
  return {
    sut,
    decrypterStub
  }
}

describe('ApiRefreshTokenToMercadoLivre UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.decrypterToken('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => { resolve(null) })
    )
    const account = await sut.decrypterToken('any_token')
    expect(account).toBeNull()
  })

  test('Should return an parameters Data on success', async () => {
    const { sut } = makeSut()
    const parameters = await sut.decrypterToken('any_token')
    expect(parameters).toEqual(makeFakeDecryptData())
  })
})
