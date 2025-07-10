import { DonationController } from '@/presentation/controllers/donation/donation-controller'
import type { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDonationValidation } from './donation-validation-factory'
import { makeDbAddDonation } from '@/main/factories/usecases/donation/add-donation/db-add-donation-factory'

export const makeDonationController = (): Controller => {
  const controller = new DonationController(
    makeDonationValidation(),
    makeDbAddDonation()
  )
  return makeLogControllerDecorator(controller)
}
