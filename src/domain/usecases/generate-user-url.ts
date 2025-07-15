export interface SlugGenerate {
  generate: (name: string) => Promise<string>
}
