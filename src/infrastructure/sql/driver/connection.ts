import knex, { Knex } from 'knex'
import * as path from 'path'
import { INDEX_TABLE_FIXTURES } from '../fixtures'
import { INDEX_TABLE_TEAMS } from '../teams'

let SQLConn: Knex

export const tables = {
  INDEX_TABLE_FIXTURES,
  INDEX_TABLE_TEAMS
}


export const SQLConnection = (configProvider) => {

  if(SQLConn) return SQLConn
  let client = configProvider.dsnProtocol()
  let connection = configProvider.dsn()
  SQLConn = knex({
    client,
    connection,
    pool: { min: 0, max: 7 },
    migrations: {
      directory: path.resolve(__dirname, './migrations')
    },
    debug: configProvider.getEnvironment() === 'testing'
  })
  return SQLConn
}


export default SQLConnection