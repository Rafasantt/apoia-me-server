import { InvalidParamError } from '@/presentation/errors'
import type { EmailValidator } from '@/validation/protocols/email-validator'
import type { Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
