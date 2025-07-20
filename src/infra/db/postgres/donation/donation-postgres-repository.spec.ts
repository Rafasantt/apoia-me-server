import { AppDataSource } from '@/infra/db/postgres/data-source/data-source'
import { DonationPostgresRepository } from './donation-postgres-repository'
import type { Repository } from 'typeorm'
import Donation from '../entities/Donation'

let accountRepository: Repository<Donation>

describe('Account PostgreSQL Repository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    accountRepository = AppDataSource.getRepository(Donation)
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  beforeEach(async () => {
    await accountRepository.delete({})
  })

  const makeSut = (): DonationPostgresRepository => {
    return new DonationPostgresRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        message: 'any_message',
        creatorId: 'any_creatorId',
        slug: 'any_slug',
        price: 1500
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.message).toBe('any_message')
      expect(account.creatorId).toBe('any_creatorId')
      expect(account.slug).toBe('any_slug')
      expect(account.price).toBe(1500)
    })
  })
})
