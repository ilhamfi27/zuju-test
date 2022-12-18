import { ConfigProviderInterface } from '../../../../config/config.provider.interface';
import Context from '../../../../context';
import { NotFoundError } from '../../../../errors';
import { Fixtures, FixturesQueryParam } from '../../../../interfaces/fixtures';
import { Paginated, Param } from '../../../../interfaces/global';
import SQLConnection, { tables } from '../../driver/connection';
import TeamsStorageProvider from '../../teams/teams.provider';

export default class FixturesSQLProvider {
  configProvider: ConfigProviderInterface;
  teamsSM: TeamsStorageProvider;
  constructor(configProvider: ConfigProviderInterface) {
    this.configProvider = configProvider;
    this.teamsSM = new TeamsStorageProvider(configProvider);
  }

  fixturesDB() {
    return SQLConnection(this.configProvider)(tables.INDEX_TABLE_FIXTURES);
  }

  async create(_context: Context, data: Fixtures): Promise<Fixtures> {
    await this.fixturesDB().insert({ ...data });
    return data;
  }

  async getAll(
    context: Context,
    param?: Param<FixturesQueryParam>
  ): Promise<Paginated<Fixtures>> {
    let fixturesDB = this.fixturesDB().select(
      `${tables.INDEX_TABLE_FIXTURES}.id`,
      `${tables.INDEX_TABLE_FIXTURES}.tournament_name`,
      `${tables.INDEX_TABLE_FIXTURES}.match_status`,
      `${tables.INDEX_TABLE_FIXTURES}.date`
    );

    const search =
      param && param.search && param.search.search
        ? param.search.search.split(':')
        : undefined;
    const sort =
      param && param.search && param.search.sort
        ? param.search.sort.split(':')
        : undefined;

    fixturesDB =
      (search &&
        fixturesDB.where(
          `${tables.INDEX_TABLE_FIXTURES}.${search[0]}`,
          `like`,
          `%${search[1]}%`
        )) ||
      fixturesDB;
    fixturesDB =
      (sort &&
        fixturesDB.orderBy(
          `${tables.INDEX_TABLE_FIXTURES}.${sort[0]}`,
          sort[1]
        )) ||
      fixturesDB.orderBy(`${tables.INDEX_TABLE_FIXTURES}.date`, 'asc');

    const t = await fixturesDB
      .clone()
      .clearSelect()
      .count<Record<string, number>>(
        `${tables.INDEX_TABLE_FIXTURES}.id as count`
      );

    const page = (param && param.pagination && param.pagination.page) || 1;
    const size = (param && param.pagination && param.pagination.size) || 10;
    fixturesDB = fixturesDB.limit(size).offset((page - 1) * size);

    const fixtures = await fixturesDB;

    for (const fixture of fixtures) {
      const homeTeam = await this.teamsSM.getByCompetition(
        context,
        fixture.id,
        'HOME'
      );
      const awayTeam = await this.teamsSM.getByCompetition(
        context,
        fixture.id,
        'AWAY'
      );
      fixture.score = { home: homeTeam.score, away: awayTeam.score };
      delete homeTeam.score
      delete awayTeam.score
      fixture.homeTeam = homeTeam;
      fixture.awayTeam = awayTeam;
    }

    const total_size: number = t[0];
    if (!fixtures) throw NotFoundError('Fixtures not found');
    const data: Fixtures[] = await Promise.all(fixtures);
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

  async get(_context: Context, id: string): Promise<Fixtures> {
    let fixturesDB = this.fixturesDB().select(
      `${tables.INDEX_TABLE_FIXTURES}.id`,
      `${tables.INDEX_TABLE_FIXTURES}.tournament_name`,
      `${tables.INDEX_TABLE_FIXTURES}.match_status`,
      `${tables.INDEX_TABLE_FIXTURES}.date`
    );

    const [fixtures] = await fixturesDB.where(
      `${tables.INDEX_TABLE_FIXTURES}.id`,
      id
    );
    fixtures.rules = JSON.parse(fixtures.rules);

    if (!fixtures) throw NotFoundError('Fixtures not found');
    return fixtures;
  }

  async update(
    _context: Context,
    id: string,
    data: Fixtures
  ): Promise<Fixtures> {
    await this.fixturesDB()
      .update({ ...data })
      .where({ id });
    return data;
  }

  async delete(_context: Context, id: string): Promise<void> {
    await this.fixturesDB().delete().where({ id });
  }
}
