export interface UrlGenerate {
  generate: (name: string) => Promise<string>
}
