import type { Repository } from 'typeorm'
import Error from '../entities/Error'
import { LogRepository } from './log-postgres-repository'
import { AppDataSource } from '../data-source/data-source'

const makeSut = (): LogRepository => {
  return new LogRepository()
}

let errorRepository: Repository<Error>

describe('Log Error Repository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    errorRepository = AppDataSource.getRepository(Error)
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  beforeEach(async () => {
    await errorRepository.clear()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorRepository.count()
    expect(count).toBe(1)
  })
})
