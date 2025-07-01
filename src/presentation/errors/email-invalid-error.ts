export class EmailInvalidError extends Error {
  constructor () {
    super('The email received is invalid')
    this.name = 'EmailInvalidError'
  }
}
