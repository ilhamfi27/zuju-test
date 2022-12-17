import { Response } from 'express';
import { ConfigProviderInterface } from '../../../config/config.provider.interface';
import DomainManagerInterface from '../../../domain/domain.manager.interface';
import { Fixtures } from '../../../interfaces/fixtures';
import { RestRequest } from '../types';

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

export const fixturesController = (
  _configProvider: ConfigProviderInterface,
  m: DomainManagerInterface
) => ({
  async createFixturesBody(r: RestRequest, w: Response) {
    const data = getFixturesBody(r);
    const fl = await m.fixturesManager().create(r.context, data);
    w.send(fl);
  },
  async fetchFixturesBody(r: RestRequest, w: Response) {
    const fl = await m.fixturesManager().fetch(r.context);
    w.send(fl);
  },
  async updateFixturesBody(r: RestRequest, w: Response) {
    const data = getFixturesBody(r);
    const id = getFixturesID(r);
    const fl = await m.fixturesManager().update(r.context, id, data);
    w.send(fl);
  },
  async deleteFixturesBody(r: RestRequest, w: Response) {
    const id = getFixturesID(r);
    await m.fixturesManager().delete(r.context, id);
    w.status(200);
  },
});

export default fixturesController;
