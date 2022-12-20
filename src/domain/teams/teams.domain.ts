import { to } from "await-to-js";
import Context from "../../context";
import TeamsStorageProvider from "../../infrastructure/sql/teams/teams.provider";
import { Teams } from "../../interfaces/teams";

export default class TeamsDomain {
  teamsSM: TeamsStorageProvider
  constructor(configProvider) {
    this.teamsSM = new TeamsStorageProvider(configProvider)
  }
  getAll(context: Context, fixture_id: string): Promise<Teams[]> {
    return this.teamsSM.getAll(context, fixture_id)
  }
  get(context: Context, fixture_id: string, id: string): Promise<Teams> {
    return this.teamsSM.get(context, fixture_id, id)
  }
  async createOrUpdate(context: Context, fixture_id: string, data: Teams): Promise<Teams> {
    const [err, existing] = await to(this.teamsSM.getByCompetition(context, fixture_id, data.team_side))
    if (err) {
      return this.teamsSM.create(context, data)
    }
    return this.teamsSM.update(context, fixture_id, existing.id, data)
  }
}
