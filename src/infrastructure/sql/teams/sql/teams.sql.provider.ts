import { ConfigProviderInterface } from '../../../../config/config.provider.interface';
import Context from '../../../../context';
import { NotFoundError } from '../../../../errors';
import {
  Teams,
  TeamsQueryParam,
} from '../../../../interfaces/teams';
import { Paginated, Param } from '../../../../interfaces/global';
import SQLConnection, { tables } from '../../driver/connection';

export default class TeamsSQLProvider {
  configProvider: ConfigProviderInterface;
  constructor(configProvider: ConfigProviderInterface) {
    this.configProvider = configProvider;
  }

  fixturesDB() {
    return SQLConnection(this.configProvider)(
      tables.INDEX_TABLE_TEAMS
    );
  }

  async create(
    _context: Context,
    data: Teams
  ): Promise<Teams> {
    await this.fixturesDB().insert({ ...data });
    return data;
  }

  async fetch(
    _context: Context,
    param?: Param<TeamsQueryParam>
  ): Promise<Paginated<Teams>> {
    let fixturesDB = this.fixturesDB().select(
      `${tables.INDEX_TABLE_TEAMS}.id`,
      `${tables.INDEX_TABLE_TEAMS}.name`,
      `${tables.INDEX_TABLE_TEAMS}.code`,
      `${tables.INDEX_TABLE_TEAMS}.score`,
      `${tables.INDEX_TABLE_TEAMS}.team_side`,
      `${tables.INDEX_TABLE_TEAMS}.fixture_id`
    );

    fixturesDB =
      (param &&
        param.search &&
        param.search.searchBy &&
        fixturesDB.where(
          `${tables.INDEX_TABLE_TEAMS}.${param.search.searchBy}`,
          param.search.search
        )) ||
      fixturesDB;
    fixturesDB =
      (param &&
        param.search &&
        param.search.sortBy &&
        fixturesDB.orderBy(
          `${tables.INDEX_TABLE_TEAMS}.${param.search.sortBy}`,
          param.search.sortOrder
        )) ||
      fixturesDB;

    const t = await fixturesDB
      .clone()
      .clearSelect()
      .count<Record<string, number>>(
        `${tables.INDEX_TABLE_TEAMS}.id as count`
      );

    const page = (param && param.pagination && param.pagination.page) || 1;
    const size = (param && param.pagination && param.pagination.size) || 10;
    fixturesDB = fixturesDB.limit(size).offset((page - 1) * size);

    const fixtures = await fixturesDB;
    for (const i in fixtures) {
      fixtures[i].rules = JSON.parse(fixtures[i].rules);
    }

    const total_size: number = t[0];
    if (!fixtures) throw NotFoundError('Fixtures details not found');
    const data: Teams[] = await Promise.all(fixtures);
    return {
      pagination: {
        page,
        size,
        total_size,
        total_page: Math.ceil(total_size / size),
      },
      data,
    };
  }

  async get(_context: Context, id: string): Promise<Teams> {
    let fixturesDB = this.fixturesDB().select(
      `${tables.INDEX_TABLE_TEAMS}.id`,
      `${tables.INDEX_TABLE_TEAMS}.name`,
      `${tables.INDEX_TABLE_TEAMS}.code`,
      `${tables.INDEX_TABLE_TEAMS}.score`,
      `${tables.INDEX_TABLE_TEAMS}.team_side`,
      `${tables.INDEX_TABLE_TEAMS}.fixture_id`
    );

    const [fixtures] = await fixturesDB.where(
      `${tables.INDEX_TABLE_TEAMS}.id`,
      id
    );
    fixtures.rules = JSON.parse(fixtures.rules);

    if (!fixtures) throw NotFoundError('Fixtures details not found');
    return fixtures;
  }

  async update(
    _context: Context,
    id: string,
    data: Teams
  ): Promise<Teams> {
    await this.fixturesDB()
      .update({ ...data })
      .where({ id });
    return data;
  }

  async delete(_context: Context, id: string): Promise<void> {
    await this.fixturesDB().delete().where({ id });
  }
}
