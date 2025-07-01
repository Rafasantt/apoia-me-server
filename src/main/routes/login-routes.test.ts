/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from 'supertest'
import app from '../config/app'
import { hash } from 'bcrypt'
import 'dotenv/config'
import { AppDataSource } from '@/infra/db/postgres/data-source/data-source'
import type { Repository } from 'typeorm'
import Account from '@/infra/db/postgres/entities/Account'
import Jwt from 'jsonwebtoken'

let accountRepository: Repository<Account>

describe('Login Routes', () => {
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

  const createAccount = async () => {
    const password = await hash('1234', 12)
    const tokenRecovery = Jwt.sign({ id: 'any_id' }, process.env.jwtSecret, { expiresIn: '15m' })
    const accountToBeInserted = accountRepository.create({
      name: 'Rafael',
      email: 'rafael@hotmail.com',
      cnpj: '95.583.157/0001-01',
      phone: '77988243220',
      typeOfBusiness: 'E-commerce',
      password,
      recoveryToken: tokenRecovery,
      role: 'admin'
    })
    await accountRepository.save(accountToBeInserted)
    return accountToBeInserted
  }

  describe('POST /signup', () => {
    // test('Should return 403 on signup without accessToken', async () => {
    //   await request(app)
    //     .post('/api/signup')
    //     .send({
    //       name: 'Rafael',
    //       email: 'rafael@hotmail.com',
    //       cnpj: '95.583.157/0001-01',
    //       phone: '77988243220',
    //       typeOfBusiness: 'E-commerce',
    //       password: 'abc123',
    //       passwordConfirmation: 'abc123',
    //       role: 'admin'
    //     })
    //     .expect(403)
    // })

    test('Should return 204 on signup if account is created', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Novo User',
          email: 'novoUser@hotmail.com',
          cnpj: '95.583.157/0001-01',
          phone: '77988243220',
          typeOfBusiness: 'E-commerce',
          password: 'abc123',
          passwordConfirmation: 'abc123',
          role: 'admin'
        })
        .expect(204)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      await createAccount()
      await request(app)
        .post('/api/login')
        .send({
          email: 'rafael@hotmail.com',
          password: '1234'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'rafael_santos.s1@hotmail.com',
          password: '1234'
        })
        .expect(401)
    })
  })
})
