export interface GetAccountByIdRepository {
  getAccount: (id: string) => Promise<void>
}
