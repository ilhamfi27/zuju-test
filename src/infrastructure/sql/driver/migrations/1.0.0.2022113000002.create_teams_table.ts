import { tables } from "../connection"
import { Knex } from 'knex'

export const up = (knex: Knex, _promise: Promise<any>) => {
  return knex.schema.createTable(tables.INDEX_TABLE_TEAMS, (table: Knex.CreateTableBuilder) => {
    table.string('id').primary()
    table.timestamp('created').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated').notNullable().defaultTo(knex.fn.now())
    
    table.string('name')
    table.string('code')
    table.integer('score').nullable().defaultTo(null)
    table.enum('team_side', ['AWAY', 'HOME']).defaultTo('HOME')
    table.string('fixture_id')
  })
}


export const down = (knex: Knex, _promise: Promise<any>) => {
  return knex.schema.dropTable(tables.INDEX_TABLE_TEAMS)
}