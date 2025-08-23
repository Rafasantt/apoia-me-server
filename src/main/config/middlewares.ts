import type { Express } from 'express'
import { bodyParser, cors, contentType, bodyParserStripe } from '../middlewares'

export default (app: Express): void => {
  app.use('/api/webhooks/stripe', bodyParserStripe)
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
