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
        cnpj: 'any CNPJ',
        phone: 'any Phone',
        typeOfBusiness: 'any Type business',
        password: 'any_password',
        role: 'any_role'
      })
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.cnpj).toBe('any CNPJ')
      expect(account.phone).toBe('any Phone')
      expect(account.typeOfBusiness).toBe('any Type business')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('any_role')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        cnpj: 'any CNPJ',
        phone: 'any Phone',
        typeOfBusiness: 'any Type business',
        password: 'any_password',
        role: 'any_role'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.cnpj).toBe('any CNPJ')
      expect(account.phone).toBe('any Phone')
      expect(account.typeOfBusiness).toBe('any Type business')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('any_role')
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
        cnpj: 'any CNPJ',
        phone: 'any Phone',
        typeOfBusiness: 'any Type business',
        password: 'any_password',
        role: 'any_role'
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
        cnpj: 'any CNPJ',
        phone: 'any Phone',
        typeOfBusiness: 'any Type business',
        password: 'any_password',
        role: 'any_role',
        accessToken: 'any_token'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.cnpj).toBe('any CNPJ')
      expect(account.phone).toBe('any Phone')
      expect(account.typeOfBusiness).toBe('any Type business')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('any_role')
    })

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        cnpj: 'any CNPJ',
        phone: 'any Phone',
        typeOfBusiness: 'any Type business',
        password: 'any_password',
        role: 'admin',
        accessToken: 'any_token'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.cnpj).toBe('any CNPJ')
      expect(account.phone).toBe('any Phone')
      expect(account.typeOfBusiness).toBe('any Type business')
      expect(account.password).toBe('any_password')
      expect(account.role).toBe('admin')
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      const accountToBeInserted = accountRepository.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        cnpj: 'any CNPJ',
        phone: 'any Phone',
        typeOfBusiness: 'any Type business',
        password: 'any_password',
        role: 'any_role'
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
        cnpj: 'any CNPJ',
        phone: 'any Phone',
        typeOfBusiness: 'any Type business',
        password: 'any_password',
        role: 'any_role',
        accessToken: 'any_token'
      })
      await accountRepository.save(accountToBeInserted)
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_token')
      expect(account).toBeFalsy()
    })
  })
})
