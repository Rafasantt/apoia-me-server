import type { AddAccountModel } from '@/domain/usecases/add-account'
// import type { OnboardingUrl } from '@/domain/models/onboarding'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AddAccountModel>
}
