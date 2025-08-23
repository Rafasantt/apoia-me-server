import { StripeWebHookController } from '@/presentation/controllers/stripeWebHook/stripeWebHook-controller'
import type { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbUpdateStatusDonation } from '@/main/factories/usecases/account/update-donation-webHook/db-update-donation-webHook-factory'

export const makeUpdateStatusDonationController = (): Controller => {
  const controller = new StripeWebHookController(
    makeDbUpdateStatusDonation()
  )
  return makeLogControllerDecorator(controller)
}
