import {
  ValidationComposite,
  RequiredFieldValidation
} from '@/validation/validators'
import type { Validation } from '@/presentation/protocols/validation'

export const makeDonationValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'name',
    'message',
    'slug',
    'price'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
