import Context from "../../../context";
import { Fixtures, FixturesByDate, FixturesQueryParam } from "../../../interfaces/fixtures";
import { Paginated, Param } from "../../../interfaces/global";
import FixturesSQLProvider from "./sql/fixtures.sql.provider";
import * as UUID from 'uuid'

export default class FixturesStorageProvider {
  coldDB: FixturesSQLProvider
  constructor(configProvider) {
    this.coldDB = new FixturesSQLProvider(configProvider)
  }

  async create(context: Context, data: Fixtures): Promise<Fixtures> {
    data.id = `competition:${UUID.v4()}`
    return this.coldDB.create(context, data)
  }

  async getAll(context: Context, param?: Param<FixturesQueryParam>): Promise<Paginated<Fixtures>> {
    return await this.coldDB.getAll(context, param)
  }

  async getAllByDate(context: Context, param?: Param<FixturesQueryParam>): Promise<FixturesByDate[]> {
    return await this.coldDB.getAllByDate(context, param)
  }

  async get(context: Context, id: string): Promise<Fixtures> {
    return await this.coldDB.get(context, id)
  }

  async update(context: Context, id: string, data: Fixtures): Promise<Fixtures> {
    return await this.coldDB.update(context, id, data);
  }

  async delete(context: Context, id: string): Promise<void> {
    await this.coldDB.delete(context, id);
  }
}