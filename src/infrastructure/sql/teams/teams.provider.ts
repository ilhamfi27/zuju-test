import { ConfigProviderInterface } from "../../../config/config.provider.interface";
import Context from "../../../context";
import { Paginated, Param } from "../../../interfaces/global";
import * as UUID from 'uuid'
import TeamsSQLProvider from "./sql/teams.sql.provider";
import { Teams, TeamsQueryParam } from "../../../interfaces/teams";

export default class TeamsStorageProvider {
  coldDB: TeamsSQLProvider
  constructor(configProvider: ConfigProviderInterface) {
    this.coldDB = new TeamsSQLProvider(configProvider)
  }

  async create(context: Context, data: Teams): Promise<Teams> {
    data.id = `competitor:${UUID.v4()}`
    return this.coldDB.create(context, data)
  }

  async getAll(context: Context, param?: Param<TeamsQueryParam>): Promise<Paginated<Teams>> {
    return await this.coldDB.getAll(context, param)
  }

  async get(context: Context, id: string): Promise<Teams> {
    return await this.coldDB.get(context, id)
  }

  async getByCompetition(context: Context, fixture_id: string, team_side: string): Promise<Teams> {
    return await this.coldDB.getByCompetition(context, fixture_id, team_side)
  }

  async update(context: Context, id: string, data: Teams): Promise<Teams> {
    return await this.coldDB.update(context, id, data);
  }

  async delete(context: Context, id: string): Promise<void> {
    await this.coldDB.delete(context, id);
  }
}