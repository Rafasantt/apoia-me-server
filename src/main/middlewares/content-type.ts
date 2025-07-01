import type { Request, Response, NextFunction } from 'express'

export const contentType = (req: Request, res: Response, next: NextFunction): void => {
  // Só aplica content-type se for JSON esperado
  if (req.path.startsWith('/api')) {
    res.type('json')
  }
  next()
}
