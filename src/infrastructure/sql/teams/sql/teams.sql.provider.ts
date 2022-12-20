import Context from '../../../../context';
import { NotFoundError } from '../../../../errors';
import { Teams } from '../../../../interfaces/teams';
import SQLConnection, { tables } from '../../driver/connection';

export default class TeamsSQLProvider {
  configProvider;
  constructor(configProvider) {
    this.configProvider = configProvider;
  }

  fixturesDB() {
    return SQLConnection(this.configProvider)(tables.INDEX_TABLE_TEAMS);
  }

  async create(_context: Context, data: Teams): Promise<Teams> {
    await this.fixturesDB().insert({ ...data });
    return data;
  }

  async getAll(_context: Context, fixture_id: string): Promise<Teams[]> {
    let fixturesDB = this.fixturesDB()
      .select(
        `${tables.INDEX_TABLE_TEAMS}.id`,
        `${tables.INDEX_TABLE_TEAMS}.name`,
        `${tables.INDEX_TABLE_TEAMS}.code`,
        `${tables.INDEX_TABLE_TEAMS}.score`,
        `${tables.INDEX_TABLE_TEAMS}.team_side`,
        `${tables.INDEX_TABLE_TEAMS}.team_logo`,
        `${tables.INDEX_TABLE_TEAMS}.fixture_id`
      )
      .where(`${tables.INDEX_TABLE_TEAMS}.fixture_id`, fixture_id);

    const fixtures = await fixturesDB;
    
    if (!fixtures) throw NotFoundError('Fixtures details not found');
    const data: Teams[] = await Promise.all(fixtures);
    return data;
  }

  async get(_context: Context, fixture_id: string, id: string): Promise<Teams> {
    let fixturesDB = this.fixturesDB()
      .select(
        `${tables.INDEX_TABLE_TEAMS}.id`,
        `${tables.INDEX_TABLE_TEAMS}.name`,
        `${tables.INDEX_TABLE_TEAMS}.code`,
        `${tables.INDEX_TABLE_TEAMS}.score`,
        `${tables.INDEX_TABLE_TEAMS}.team_side`,
        `${tables.INDEX_TABLE_TEAMS}.team_logo`,
        `${tables.INDEX_TABLE_TEAMS}.fixture_id`
      )
      .where(`${tables.INDEX_TABLE_TEAMS}.fixture_id`, fixture_id);

    const [fixtures] = await fixturesDB.where(
      `${tables.INDEX_TABLE_TEAMS}.id`,
      id
    );

    if (!fixtures) throw NotFoundError('Fixtures details not found');
    return fixtures;
  }

  async getByCompetition(
    _context: Context,
    fixture_id: string,
    team_side: string
  ): Promise<Teams> {
    let fixturesDB = this.fixturesDB().select(
      `${tables.INDEX_TABLE_TEAMS}.id`,
      `${tables.INDEX_TABLE_TEAMS}.name`,
      `${tables.INDEX_TABLE_TEAMS}.code`,
      `${tables.INDEX_TABLE_TEAMS}.score`,
      `${tables.INDEX_TABLE_TEAMS}.team_logo`
    );

    const [fixtures] = await fixturesDB
      .where(`${tables.INDEX_TABLE_TEAMS}.fixture_id`, fixture_id)
      .where(`${tables.INDEX_TABLE_TEAMS}.team_side`, team_side);

    if (!fixtures) {
      throw NotFoundError('Fixtures details not found');
    }
    return fixtures;
  }

  async update(
    _context: Context,
    fixture_id: string,
    id: string,
    data: Teams
  ): Promise<Teams> {
    await this.fixturesDB()
      .update({ ...data })
      .where(`${tables.INDEX_TABLE_TEAMS}.id`, id)
      .where(`${tables.INDEX_TABLE_TEAMS}.fixture_id`, fixture_id);
    return data;
  }

  async delete(
    _context: Context,
    fixture_id: string,
    id: string
  ): Promise<void> {
    await this.fixturesDB()
      .delete()
      .where(`${tables.INDEX_TABLE_TEAMS}.id`, id)
      .where(`${tables.INDEX_TABLE_TEAMS}.fixture_id`, fixture_id);
  }
}
