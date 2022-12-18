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


require('express-async-errors');

export const RestRouter = (c: ConfigProviderInterface, m: DomainManagerInterface) => {
  const router = Router();
  const publicRouter = Router();
  const fixturesCtrl = fixturesController(c, m);

  router.use(bodyParser.json());
  router.use(publicRouter);
  publicRouter.use(cors({ origin: c.allowedCorsDomains() }));

  router.get('/', (_r: RestRequest, w: Response) => {
    w.redirect('/api-docs')
  })
  router.get(`/fixtures`, fixturesCtrl.getAllFixtures)
  router.post(`/fixtures`, fixturesCtrl.createFixtures)
  router.post(`/fixtures/:${fixturesParams.id}`, fixturesCtrl.updateFixtures)
  router.delete(`/fixtures/:${fixturesParams.id}`, fixturesCtrl.deleteFixtures)

  router.use('/api-docs', swaggerExpress.serve, swaggerExpress.setup(docs));
  router.use(catchMiddleware(c.logger()));
  return router;
};