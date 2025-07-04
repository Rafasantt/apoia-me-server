export interface LoadAccountByUserUrl {
  load: (userUrl: string) => Promise<string>
}
