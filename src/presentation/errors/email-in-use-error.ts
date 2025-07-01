export class EmailInUseError extends Error {
  constructor () {
    super('O e-mail fornecido já está em uso')
    this.name = 'EmailInUseError'
  }
}
