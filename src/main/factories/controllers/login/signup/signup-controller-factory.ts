import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import type { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeGenerateSlugAccount } from '@/main/factories/usecases/account/slug-generate/slug-generate-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeGenerateSlugAccount(),
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(controller)
}
