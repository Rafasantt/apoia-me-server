import type { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { GetAccountDataController } from '@/presentation/controllers/get-account-data/get-account-data-controller'
import { makeDbGetAccountData } from '@/main/factories/usecases/account/get-account-data/db-get-account-data-factory'

export const makeGetAccountDataController = (): Controller => {
  const controller = new GetAccountDataController(
    makeDbGetAccountData()
  )
  return makeLogControllerDecorator(controller)
}
