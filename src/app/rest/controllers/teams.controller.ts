import { Response } from 'express';
import { Teams, TeamSide } from '../../../interfaces/teams';
import { RestRequest } from '../types';
import { getFixturesID } from './fixtures.controller';

export const teamsParams = {
  id: 'id_teams',
  side: 'team_side',
};

export const getTeamsID = (r: RestRequest): string =>
  r.params[teamsParams.id] || r.body[teamsParams.id] || r.query[teamsParams.id];

export const getTeamSide = (r: RestRequest): TeamSide =>
  r.params[teamsParams.side].toUpperCase() === 'AWAY'
    ? TeamSide.AWAY
    : TeamSide.HOME;

export const getTeamsBody = (r: RestRequest): Teams => ({
  name: r.body.name,
  code: r.body.code,
  score: r.body.score,
  team_side: getTeamSide(r),
  team_logo: r.body.team_logo,
  fixture_id: getFixturesID(r),
});

export const teamsController = (_configProvider, m) => ({
  async getAllTeams(r: RestRequest, w: Response) {
    const t = await m.teamsManager().getAll(r.context, getFixturesID(r));
    w.send(t).status(200);
  },
  async getTeams(r: RestRequest, w: Response) {
    const t = await m
      .teamsManager()
      .get(r.context, getFixturesID(r), getTeamsID(r));
    w.send(t).status(200);
  },
  async updateTeams(r: RestRequest, w: Response) {
    const body = getTeamsBody(r);
    const t = await m
      .teamsManager()
      .createOrUpdate(r.context, getFixturesID(r), body);
    w.send(t).status(200);
  },
});

export default teamsController;
