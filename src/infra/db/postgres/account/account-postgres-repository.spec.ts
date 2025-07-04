import { AppDataSource } from '@/infra/db/postgres/data-source/data-source'
import { AccountPostgresRepository } from './account-postgres-repository'
import type { Repository } from 'typeorm'
import Account from '../entities/Account'

let accountRepository: Repository<Account>

describe('Account PostgreSQL Repository', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    accountRepository = AppDataSource.getRepository(Account)
  })

  afterAll(async () => {
    await AppDataSource.destroy()
  })

  beforeEach(async () => {
    await accountRepository.delete({})
  })

  const makeSut = (): AccountPostgresRepository => {
    return new AccountPostgresRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role',
        userUrl: 'any_userUrl'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('any_role')
      expect(account.userUrl).toBe('any_userUrl')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role',
        userUrl: 'any_userUrl'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('any_role')
      expect(account.userUrl).toBe('any_userUrl')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role',
        userUrl: 'any_userUrl'
      })
      const savedAccount = await accountRepository.save(accountToBeInserted)
      await sut.updateAccessToken(savedAccount.id, 'any_token')
      const account = await accountRepository.findOneBy({
        id: savedAccount.id
      })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role',
        accessToken: 'any_token',
        userUrl: 'any_userUrl'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('any_role')
      expect(account.userUrl).toBe('any_userUrl')
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'admin',
        accessToken: 'any_token',
        userUrl: 'any_userUrl'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('admin')
      expect(account.userUrl).toBe('any_userUrl')
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role',
        userUrl: 'any_userUrl'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'any_role',
        accessToken: 'any_token',
        userUrl: 'any_userUrl'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
      expect(account.userUrl).toBe('any_userUrl')
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_token')
      expect(account).toBeFalsy()
    })
  })
})
