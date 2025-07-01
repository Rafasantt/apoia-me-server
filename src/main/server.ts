import 'module-alias/register'
import { AppDataSource } from '@/infra/db/postgres/data-source/data-source'

AppDataSource.initialize()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.port, () => {
      console.log(`Server running at http://localhost:${process.env.port}`)
    })
  })
  .catch(console.error)
