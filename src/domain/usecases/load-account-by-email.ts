export interface LoadAccountByEmail {
  load: (email: string) => Promise<string>
}
