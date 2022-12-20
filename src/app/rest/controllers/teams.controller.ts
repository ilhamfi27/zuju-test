import { Response } from 'express';
import { ConfigProviderInterface } from '../../../config/config.provider.interface';
import DomainManagerInterface from '../../../domain/domain.manager.interface';
import { Teams } from '../../../interfaces/teams';
import { RestRequest } from '../types';
import { getFixturesID } from './fixtures.controller';

export const teamsParams = {
  id: 'id_teams',
};

export const getTeamsID = (r: RestRequest) =>
  r.params[teamsParams.id] ||
  r.body[teamsParams.id] ||
  r.query[teamsParams.id];

export const getTeamsBody = (r: RestRequest): Teams => ({
  name: r.body.name,
  code: r.body.code,
  score: r.body.score,
  team_side: r.body.team_side,
  team_logo: r.body.team_logo,
  fixture_id: getFixturesID(r)
});

export const teamsController = (
  _configProvider: ConfigProviderInterface,
  m: DomainManagerInterface
) => ({
  async createTeams(r: RestRequest, w: Response){
    const body = getTeamsBody(r)
    const t = await m.teamsManager().create(r.context, body)
    w.send(t).status(201)
  },
  async getAllTeams(r: RestRequest, w: Response){
    const t = await m.teamsManager().getAll(r.context, getFixturesID(r))
    w.send(t).status(200)
  },
  async getTeams(r: RestRequest, w: Response){
    console.log(getFixturesID(r));
    console.log(getTeamsID(r));
    
    const t = await m.teamsManager().get(r.context, getFixturesID(r), getTeamsID(r))
    w.send(t).status(200)
  },
  async updateTeams(r: RestRequest, w: Response){
    const body = getTeamsBody(r)
    const t = await m.teamsManager().update(r.context, getFixturesID(r), getTeamsID(r), body)
    w.send(t).status(200)
  },
  async deleteTeams(r: RestRequest, w: Response){
    await m.teamsManager().delete(r.context, getFixturesID(r), getTeamsID(r))
    w.status(201).send()
  },
});

export default teamsController;
