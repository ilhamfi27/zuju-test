import { to } from "await-to-js";
import { ConfigProviderInterface } from "../../config/config.provider.interface";
import Context from "../../context";
import FixturesStorageProvider from "../../infrastructure/sql/fixtures/fixtures.provider";
import FixturesManager, { Fixtures, FixturesByDate, FixturesQueryParam } from "../../interfaces/fixtures";
import { Param, Paginated } from "../../interfaces/global";

export default class FixturesDomain implements FixturesManager {
  fixturesSM: FixturesStorageProvider
  constructor(configProvider: ConfigProviderInterface) {
    this.fixturesSM = new FixturesStorageProvider(configProvider)
  }
  create(context: Context, data: Fixtures): Promise<Fixtures> {
    return this.fixturesSM.create(context, data)
  }
  getAll(context: Context, param?: Param<FixturesQueryParam> | undefined): Promise<Paginated<Fixtures>> {
    return this.fixturesSM.getAll(context, param)
  }
  async getAllByDate(context: Context, param?: Param<FixturesQueryParam> | undefined): Promise<FixturesByDate[]> {
    return this.fixturesSM.getAllByDate(context, param)
  }
  update(context: Context, id: string, data: Fixtures): Promise<Fixtures> {
    return this.fixturesSM.update(context, id, data)
  }
  delete(context: Context, id: string): Promise<void> {
    return this.fixturesSM.delete(context, id)
  }
}
