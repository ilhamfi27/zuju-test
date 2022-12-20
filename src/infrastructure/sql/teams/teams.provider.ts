import { ConfigProviderInterface } from "../../../config/config.provider.interface";
import Context from "../../../context";
import * as UUID from 'uuid'
import TeamsSQLProvider from "./sql/teams.sql.provider";
import { Teams } from "../../../interfaces/teams";

export default class TeamsStorageProvider {
  coldDB: TeamsSQLProvider
  constructor(configProvider: ConfigProviderInterface) {
    this.coldDB = new TeamsSQLProvider(configProvider)
  }

  async create(context: Context, data: Teams): Promise<Teams> {
    data.id = `competitor:${UUID.v4()}`
    return this.coldDB.create(context, data)
  }

  async getAll(context: Context, fixture_id: string): Promise<Teams[]> {
    return await this.coldDB.getAll(context, fixture_id)
  }

  async get(context: Context, fixture_id: string, id: string): Promise<Teams> {
    return await this.coldDB.get(context, fixture_id, id)
  }

  async update(context: Context, fixture_id: string, id: string, data: Teams): Promise<Teams> {
    return await this.coldDB.update(context, fixture_id, id, data);
  }

  async delete(context: Context, fixture_id: string, id: string): Promise<void> {
    await this.coldDB.delete(context, fixture_id, id);
  }

  async getByCompetition(context: Context, fixture_id: string, team_side: string): Promise<Teams> {
    return await this.coldDB.getByCompetition(context, fixture_id, team_side)
  }
}