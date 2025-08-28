import { AppDataSource } from '@/infra/db/postgres/data-source/data-source'
import { DonationPostgresRepository } from './donation-postgres-repository'
import type { Repository } from 'typeorm'
import Account from '../entities/Account'
import Donation from '../entities/Donation'
import { v4 as uuidv4 } from 'uuid'

let accountRepository: Repository<Account>
let donationRepository: Repository<Donation>

describe('Account PostgreSQL Repository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    donationRepository = AppDataSource.getRepository(Donation)
    accountRepository = AppDataSource.getRepository(Account)
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  beforeEach(async () => {
    await donationRepository.delete({})
    await accountRepository.delete({})
  })

  const makeSut = (): DonationPostgresRepository => {
    return new DonationPostgresRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const creator = await accountRepository.save({
        id: uuidv4(),
        name: 'creator_name',
        email: 'creator@mail.com',
        password: 'hashed_password',
        role: 'creator',
        slug: 'creator_slug'
      })

      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        message: 'any_message',
        creatorId: creator.id,
        slug: 'any_slug',
        price: 1500
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.message).toBe('any_message')
      expect(account.creatorId).toBe(creator.id)
      expect(account.slug).toBe('any_slug')
      expect(account.price).toBe(1500)
    })
  })
})
