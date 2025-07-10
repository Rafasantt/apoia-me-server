import {
  ValidationComposite,
  RequiredFieldValidation
} from '@/validation/validators'
import type { Validation } from '@/presentation/protocols/validation'
import { makeDonationValidation } from './donation-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('DonationValidation Factory', () => {
  test('Should call ValidationComposite with all validatations', () => {
    makeDonationValidation()
    const validations: Validation[] = []
    for (const field of [
      'name',
      'message',
      'slug',
      'price'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
