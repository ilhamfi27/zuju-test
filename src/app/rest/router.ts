import { Response, Router } from 'express';
import * as docs from './docs/swagger.json';
import swaggerExpress from 'swagger-ui-express';
import bodyParser from 'body-parser';
import catchMiddleware from './middlewares/catch';
import cors from 'cors';
import DomainManagerInterface from '../../domain/domain.manager.interface';
import { ConfigProviderInterface } from '../../config/config.provider.interface';
import fixturesController, { fixturesParams } from './controllers/fixtures.controller';
import { RestRequest } from './types';
import teamsController, { teamsParams } from './controllers/teams.controller';


require('express-async-errors');

export const RestRouter = (c: ConfigProviderInterface, m: DomainManagerInterface) => {
  const router = Router();
  const publicRouter = Router();
  const fixturesCtrl = fixturesController(c, m);
  const teamsCtrl = teamsController(c, m);

  router.use(bodyParser.json());
  router.use(publicRouter);
  publicRouter.use(cors({ origin: c.allowedCorsDomains() }));

  router.get('/', (_r: RestRequest, w: Response) => {
    w.redirect('/api-docs')
  })
  router.get(`/fixtures`, fixturesCtrl.getAllFixtures)
  router.get(`/fixtures/calendar`, fixturesCtrl.getAllFixturesByDate)
  router.post(`/admin/fixtures`, fixturesCtrl.createFixtures)
  router.get(`/admin/fixtures/:${fixturesParams.id}`, fixturesCtrl.getFixtures)
  router.put(`/admin/fixtures/:${fixturesParams.id}`, fixturesCtrl.updateFixtures)
  router.delete(`/admin/fixtures/:${fixturesParams.id}`, fixturesCtrl.deleteFixtures)

  router.get(`/admin/fixtures/:${fixturesParams.id}/teams`, teamsCtrl.getAllTeams)
  router.post(`/admin/fixtures/:${fixturesParams.id}/teams`, teamsCtrl.createTeams)
  router.get(`/admin/fixtures/:${fixturesParams.id}/teams/:${teamsParams.id}`, teamsCtrl.getTeams)
  router.put(`/admin/fixtures/:${fixturesParams.id}/teams/:${teamsParams.id}`, teamsCtrl.updateTeams)
  router.delete(`/admin/fixtures/:${fixturesParams.id}/teams/:${teamsParams.id}`, teamsCtrl.deleteTeams)

  router.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(docs));
  router.use(catchMiddleware(c.logger()));
  return router;
};