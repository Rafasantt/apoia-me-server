import type { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { AppDataSource } from '@/infra/db/postgres/data-source/data-source'

export class LogRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorRepository = AppDataSource.getRepository('errors')
    const logErrorToBeInserted = errorRepository.create({
      stack,
      date: new Date()
    })
    await errorRepository.save(logErrorToBeInserted)
  }
}
