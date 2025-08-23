import { json, raw } from 'express'

export const bodyParser = json()
export const bodyParserStripe = raw({ type: 'application/json' })
