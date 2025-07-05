import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import type { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeGenerateUrlAccount } from '@/main/factories/usecases/account/url-generate/url-generate-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeGenerateUrlAccount(),
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(controller)
}
