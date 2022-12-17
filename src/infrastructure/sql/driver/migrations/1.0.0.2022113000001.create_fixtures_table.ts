import { tables } from "../connection"
import { Knex } from 'knex'

export const up = (knex: Knex, _promise: Promise<any>) => {
  return knex.schema.createTable(tables.INDEX_TABLE_FIXTURES, (table: Knex.CreateTableBuilder) => {
    table.string('id').primary()
    table.timestamp('created').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated').notNullable().defaultTo(knex.fn.now())
    
    table.string('tournament_name')
    table.enum('match_status', ['FIXTURE', 'PLAYED']).defaultTo('FIXTURE')
    table.datetime('date')
  })
}


export const down = (knex: Knex, _promise: Promise<any>) => {
  return knex.schema.dropTable(tables.INDEX_TABLE_FIXTURES)
}