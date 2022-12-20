import { Knex } from 'knex';
import Context from '../../../../context';
import { NotFoundError } from '../../../../errors';
import {
  Fixtures,
  FixturesByDate,
  FixturesQueryParam,
  MatchStatus,
} from '../../../../interfaces/fixtures';
import { Paginated, Param } from '../../../../interfaces/global';
import SQLConnection, { tables } from '../../driver/connection';
import TeamsStorageProvider from '../../teams/teams.provider';

export default class FixturesSQLProvider {
  configProvider;
  teamsSM: TeamsStorageProvider;
  db: Knex;
  constructor(configProvider) {
    this.configProvider = configProvider;
    this.teamsSM = new TeamsStorageProvider(configProvider);
    this.db = SQLConnection(this.configProvider);
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
      `${tables.INDEX_TABLE_FIXTURES}.match_datetime`
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
      fixturesDB.orderBy(
        `${tables.INDEX_TABLE_FIXTURES}.match_datetime`,
        'asc'
      );

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
      const home_team = await this.teamsSM.getByCompetition(
        context,
        fixture.id,
        'HOME'
      );
      const away_team = await this.teamsSM.getByCompetition(
        context,
        fixture.id,
        'AWAY'
      );
      fixture.match_status =
        new Date(fixture.match_datetime) > new Date()
          ? MatchStatus.FIXTURE
          : MatchStatus.PLAYED;
      fixture.home_team = home_team;
      fixture.away_team = away_team;
    }

    const total_size: number = t[0]['count'];
    if (!fixtures) throw NotFoundError('Fixtures not found');
    const data: Fixtures[] = await Promise.all(fixtures);
    return {
      pagination: {
        page: +page,
        size: +size,
        total_size,
        total_page: Math.ceil(total_size / size),
      },
      data,
    };
  }

  async getAllByDate(
    _context: Context,
    param?: Param<FixturesQueryParam>
  ): Promise<FixturesByDate[]> {
    let fixturesDB = this.fixturesDB().select(
      this.db.raw(
        `COUNT(${tables.INDEX_TABLE_FIXTURES}.id) as match_count, DATE(${tables.INDEX_TABLE_FIXTURES}.match_datetime) as date`
      )
    );

    const startDate =
      param && param.search && param.search.startDate
        ? new Date(param.search.startDate)
        : undefined;
    
    fixturesDB =
      (startDate &&
        fixturesDB.where(
          `${tables.INDEX_TABLE_FIXTURES}.match_datetime`,
          `>=`,
          startDate
        )) ||
      fixturesDB;
    fixturesDB = fixturesDB.groupByRaw(
      `DATE(${tables.INDEX_TABLE_FIXTURES}.match_datetime)`
    );
    fixturesDB = fixturesDB.orderByRaw(
      `DATE(${tables.INDEX_TABLE_FIXTURES}.match_datetime) asc`
    );
    const fixtures = await fixturesDB;
    const data: FixturesByDate[] = await Promise.all(fixtures);
    
    return data;
  }

  async get(_context: Context, id: string): Promise<Fixtures> {
    let fixturesDB = this.fixturesDB().select(
      `${tables.INDEX_TABLE_FIXTURES}.id`,
      `${tables.INDEX_TABLE_FIXTURES}.tournament_name`,
      `${tables.INDEX_TABLE_FIXTURES}.match_datetime`
    );

    const [fixtures] = await fixturesDB.where(
      `${tables.INDEX_TABLE_FIXTURES}.id`,
      id
    );

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
