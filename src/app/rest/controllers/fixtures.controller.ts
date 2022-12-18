import { Response } from 'express';
import { ConfigProviderInterface } from '../../../config/config.provider.interface';
import DomainManagerInterface from '../../../domain/domain.manager.interface';
import { Fixtures } from '../../../interfaces/fixtures';
import { RestRequest } from '../types';
import { getPage, getSize } from './global';

export const fixturesParams = {
  id: 'id_fixtures_listings',
};

export const getFixturesID = (r: RestRequest) =>
  r.params[fixturesParams.id] ||
  r.body[fixturesParams.id] ||
  r.query[fixturesParams.id];

export const getFixturesBody = (r: RestRequest): Fixtures => ({
  tournament_name: r.body.tournament_name,
  match_status: r.body.match_status,
  date: r.body.date,
});

export const getSearch = (r: RestRequest): string => r.query.search as any;
export const getSort = (r: RestRequest): string => r.query.sort as any;

export const fixturesController = (
  _configProvider: ConfigProviderInterface,
  m: DomainManagerInterface
) => ({
  async createFixtures(r: RestRequest, w: Response) {
    const data = getFixturesBody(r);
    const fl = await m.fixturesManager().create(r.context, data);
    w.send(fl);
  },
  async getAllFixtures(r: RestRequest, w: Response) {
    const [page, size, search, sort] = [
      getPage(r),
      getSize(r),
      getSearch(r),
      getSort(r),
    ];
    const fl = await m.fixturesManager().getAll(r.context, {
      search: {
        search,
        sort,
      },
      pagination: {
        page,
        size,
      },
    });
    w.send(fl);
  },
  async updateFixtures(r: RestRequest, w: Response) {
    const data = getFixturesBody(r);
    const id = getFixturesID(r);
    const fl = await m.fixturesManager().update(r.context, id, data);
    w.send(fl);
  },
  async deleteFixtures(r: RestRequest, w: Response) {
    const id = getFixturesID(r);
    await m.fixturesManager().delete(r.context, id);
    w.status(200);
  },
});

export default fixturesController;
