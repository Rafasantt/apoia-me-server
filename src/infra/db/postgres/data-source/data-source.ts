/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable n/no-path-concat */
  import 'dotenv/config'
  import { readdirSync } from 'fs'
  import { join } from 'path'
  import 'reflect-metadata'
  import { DataSource } from 'typeorm'

  function loadEntities () {
    const entitiesDir = join(__dirname, '../entities')
    return readdirSync(entitiesDir)
      .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
      .map(file => require(join(entitiesDir, file)).default)
  }

  function loadMigrations () {
    const migrationsDir = join(__dirname, '../migrations') // Caminho para o diretório de migrations
    return readdirSync(migrationsDir)
      .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
      .map(file => join(migrationsDir, file)) // Migrations são passadas como paths
  }

  export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: loadEntities(),
    migrations: loadMigrations()
  })
