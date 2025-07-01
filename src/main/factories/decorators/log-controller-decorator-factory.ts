import { LogControllerDecorator } from '@/main/decorator/log-controller-decorator'
import type { Controller } from '@/presentation/protocols'
import { LogRepository } from '@/infra/db/postgres/log/log-postgres-repository'

export const makeLogControllerDecorator = (
  controller: Controller
): Controller => {
  const logRepository = new LogRepository()
  return new LogControllerDecorator(controller, logRepository)
}
