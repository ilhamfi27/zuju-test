import { Response, Router } from 'express';
import * as docs from './docs/swagger.json';
import swaggerExpress from 'swagger-ui-express';
import bodyParser from 'body-parser';
import catchMiddleware from './middlewares/catch';
import basicAuth from 'express-basic-auth'
import DomainManagerInterface from '../../domain/domain.manager.interface';
import { ConfigProviderInterface } from '../../config/config.provider.interface';
import fixturesController, { fixturesParams } from './controllers/fixtures.controller';
import { RestRequest } from './types';
import teamsController, { teamsParams } from './controllers/teams.controller';

require('express-async-errors');

const getUnauthorizedResponse = (_req) => {
  return 'not authorized'
}

export const RestRouter = (c: ConfigProviderInterface, m: DomainManagerInterface) => {
  const router = Router();
  const adminRouter = Router();
  const fixturesCtrl = fixturesController(c, m);
  const teamsCtrl = teamsController(c, m);

  router.use(bodyParser.json());
  adminRouter.use(bodyParser.json());

  router.get('/', (_r: RestRequest, w: Response) => {
    w.send("Hello to My Zuju Code Subsission, click <a href='/api-docs'>here</a> to go to the documentation")
  })
  router.get(`/fixtures`, fixturesCtrl.getAllFixtures)
  router.get(`/fixtures/calendar`, fixturesCtrl.getAllFixturesByDate)

  adminRouter.use(basicAuth({
    users: { [c.basicAuthUsername()]: c.basicAuthPassword() },
    unauthorizedResponse: getUnauthorizedResponse
  }))
  adminRouter.post(`/admin/fixtures`, fixturesCtrl.createFixtures)
  adminRouter.get(`/admin/fixtures/:${fixturesParams.id}`, fixturesCtrl.getFixtures)
  adminRouter.put(`/admin/fixtures/:${fixturesParams.id}`, fixturesCtrl.updateFixtures)
  adminRouter.delete(`/admin/fixtures/:${fixturesParams.id}`, fixturesCtrl.deleteFixtures)

  adminRouter.get(`/admin/fixtures/:${fixturesParams.id}/teams`, teamsCtrl.getAllTeams)
  adminRouter.get(`/admin/fixtures/:${fixturesParams.id}/teams/:${teamsParams.id}`, teamsCtrl.getTeams)
  adminRouter.put(`/admin/fixtures/:${fixturesParams.id}/side/:${teamsParams.side}`, teamsCtrl.updateTeams)

  router.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(docs));
  router.use(catchMiddleware(c.logger()));
  router.use(adminRouter)
  return router;
};