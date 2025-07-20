import type {
  AccountModel,
  AccountOnboardingRepository,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  CreateAccountStripeRepository,
  Hasher,
  LoadAccountByEmailRepository
} from './bd-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly createAccountStripeRepository: CreateAccountStripeRepository,
    private readonly stripeOnboardingRepository: AccountOnboardingRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email
    )

    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)

      const connectedStripeAccountId = await this.createAccountStripeRepository.createAccount()

      await this.stripeOnboardingRepository.onboarding(connectedStripeAccountId)

      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword, connectedStripeAccountId })
      )
      return newAccount
    }
    return null
  }
}
