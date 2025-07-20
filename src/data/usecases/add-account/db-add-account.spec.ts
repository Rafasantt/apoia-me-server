import { DbAddAccount } from './db-add-account'
import type {
  AddAccountModel,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
  CreateAccountStripeRepository,
  AccountOnboardingRepository,
  OnboardingUrl,
  AccountModel
} from './bd-add-account-protocols'

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    accounts: {
      create: jest.fn().mockResolvedValue({ id: 'acct_test_123' })
    },
    accountLinks: {
      create: jest.fn().mockResolvedValue({ url: 'https://connect.stripe.com/setup/s/test123' })
    }
  }))
})

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => {
        resolve('hashed_password')
      })
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(makeFakeAccount())
      })
    }
  }
  return new AddAccountRepositoryStub()
}

const makeCreateAccountStripeRepository = (): CreateAccountStripeRepository => {
  class CreateAccountStripeRepositoryStub implements CreateAccountStripeRepository {
    async createAccount (): Promise<any> {
      return await new Promise(resolve => {
        resolve('valid_stripe_account_id')
      })
    }
  }
  return new CreateAccountStripeRepositoryStub()
}

const makeAccountOnboardingRepository = (): AccountOnboardingRepository => {
  class AccountOnboardingRepositoryStub implements AccountOnboardingRepository {
    async onboarding (accountId: string): Promise<OnboardingUrl> {
      return await new Promise(resolve => {
        resolve({ url: 'valid_url' })
      })
    }
  }
  return new AccountOnboardingRepositoryStub()
}

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
  role: 'valid_role',
  slug: 'valid_slug',
  connectedStripeAccountId: 'valid_stripe_account_id'
})

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role: 'valid_role',
  slug: 'valid_slug',
  connectedStripeAccountId: 'valid_stripe_account_id'
})

interface SutTypes {
  sut: DbAddAccount
  hasherStub: Hasher
  createAccountStripeRepositoryStub: CreateAccountStripeRepository
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  stripeOnboardingRepositoryStub: AccountOnboardingRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const hasherStub = makeHasher()
  const createAccountStripeRepositoryStub = makeCreateAccountStripeRepository()
  const stripeOnboardingRepositoryStub = makeAccountOnboardingRepository()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(
    hasherStub,
    loadAccountByEmailRepositoryStub,
    createAccountStripeRepositoryStub,
    stripeOnboardingRepositoryStub,
    addAccountRepositoryStub
  )
  return {
    sut,
    hasherStub,
    loadAccountByEmailRepositoryStub,
    createAccountStripeRepositoryStub,
    stripeOnboardingRepositoryStub,
    addAccountRepositoryStub
  }
}

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
  implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(null)
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

describe('DbAddAccount UseCase', () => {
  test('Should call hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeAccountData())
    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  // test('Should call CreateAccountStripeRepository', async () => {
  //   const { sut } = makeSut()
  //   const createSpy = jest.spyOn(Stripe, '')
  //   await sut.add(makeFakeAccountData())
  //   expect(createSpy).toHaveBeenCalled()
  // })

  // test('Should throw if CreateAccountStripeRepository throws', async () => {
  //   const { sut, createAccountStripeRepositoryStub } = makeSut()
  //   jest.spyOn(createAccountStripeRepositoryStub, 'createAccount').mockReturnValueOnce(
  //     new Promise((resolve, reject) => {
  //       reject(new Error())
  //     })
  //   )
  //   const promise = sut.add(makeFakeAccountData())
  //   await expect(promise).rejects.toThrow()
  // })

  // test('Should call stripeOnboardingRepository with correct value', async () => {
  //   const { sut, stripeOnboardingRepositoryStub } = makeSut()
  //   const onboardingSpy = jest.spyOn(stripeOnboardingRepositoryStub, 'onboarding')
  //   await sut.add(makeFakeAccountData())
  //   expect(onboardingSpy).toHaveBeenCalledWith('stripe_account_id')
  // })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
      role: 'valid_role',
      slug: 'valid_slug',
      connectedStripeAccountId: 'valid_stripe_account_id'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an onboardingUrl on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual({ url: 'valid_url' })
  })

  test('Should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => { resolve(makeFakeAccount()) }))
    const account = await sut.add(makeFakeAccountData())
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeAccountData())
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})
