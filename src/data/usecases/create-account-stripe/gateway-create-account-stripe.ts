import type {
  CreateAccountStripeRepository,
  GatewayCreateAccount
} from './gateway-create-account-stripe-protocols'

export class GatewayCreateAccountStripe implements GatewayCreateAccount {
  constructor (
    private readonly createAccountStripeRepository: CreateAccountStripeRepository
  ) {}

  async create (): Promise<any> {
    return await this.createAccountStripeRepository.createAccount()
  }
}
