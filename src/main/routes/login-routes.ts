/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'
// import { adaptMiddleware } from '../adapters/express-middleware-adapter'
// import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  // const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
