import { Response } from 'express';
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
  match_datetime: new Date(r.body.match_datetime),
} as Fixtures);

export const getSearch = (r: RestRequest): string => r.query.search as any;
export const getStartDate = (r: RestRequest): string => r.query.startDate as any;
export const getSort = (r: RestRequest): string => r.query.sort as any;

export const fixturesController = (
  _configProvider,
  m
) => ({
  async createFixtures(r: RestRequest, w: Response) {
    const data = getFixturesBody(r);
    const fl = await m.fixturesManager().create(r.context, data);
    w.status(201).send(fl);
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
  async getAllFixturesByDate(r: RestRequest, w: Response) {
    const [startDate] = [
      getStartDate(r),
    ];
    const fl = await m.fixturesManager().getAllByDate(r.context, {
      search: {
        startDate
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
  async getFixtures(r: RestRequest, w: Response) {
    const id = getFixturesID(r);
    const fl = await m.fixturesManager().get(r.context, id);
    w.send(fl);
  },
  async deleteFixtures(r: RestRequest, w: Response) {
    const id = getFixturesID(r);
    await m.fixturesManager().delete(r.context, id);
    w.status(202).send();
  },
});

export default fixturesController;
