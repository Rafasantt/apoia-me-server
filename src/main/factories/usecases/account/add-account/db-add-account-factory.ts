import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import type { AddAccount } from '@/domain/usecases/add-account'
import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { StripeCreateAccountRepository } from '@/infra/gateways/stripe/create-account/stripe-create-account'
import { StripeOnboardingRepository } from '@/infra/gateways/stripe/onboarding/stripe-onboarding'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const createAccountRepository = new StripeCreateAccountRepository()
  const onboardingRepository = new StripeOnboardingRepository()
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAddAccount(
    bcryptAdapter,
    accountPostgresRepository,
    createAccountRepository,
    onboardingRepository,
    accountPostgresRepository
  )
}
