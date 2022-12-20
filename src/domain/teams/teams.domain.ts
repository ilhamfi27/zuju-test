import { ConfigProviderInterface } from "../../config/config.provider.interface";
import Context from "../../context";
import TeamsStorageProvider from "../../infrastructure/sql/teams/teams.provider";
import TeamsManager, { Teams } from "../../interfaces/teams";

export default class TeamsDomain implements TeamsManager {
  teamsSM: TeamsStorageProvider
  constructor(configProvider: ConfigProviderInterface) {
    this.teamsSM = new TeamsStorageProvider(configProvider)
  }
  create(context: Context, data: Teams): Promise<Teams> {
    return this.teamsSM.create(context, data)
  }
  getAll(context: Context, fixture_id: string): Promise<Teams[]> {
    return this.teamsSM.getAll(context, fixture_id)
  }
  get(context: Context, fixture_id: string, id: string): Promise<Teams> {
    return this.teamsSM.get(context, fixture_id, id)
  }
  update(context: Context, fixture_id: string, id: string, data: Teams): Promise<Teams> {
    return this.teamsSM.update(context, fixture_id, id, data)
  }
  delete(context: Context, fixture_id: string, id: string): Promise<void> {
    return this.teamsSM.delete(context, fixture_id, id)
  }
}
