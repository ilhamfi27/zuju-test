import request from 'supertest';
import {
  Fixtures,
  FixturesByDate,
  FixturesQueryParam,
} from '../../../../src/interfaces/fixtures';
import { app } from '../../../app';
import {
  fixtureExamples,
  seedFixtures,
  truncateFixtures,
} from '../../../fixtures/fixtures';

describe('POST /admin/fixtures', () => {
  beforeAll(async () => {
    await truncateFixtures();
    await seedFixtures();
  });

  afterAll(async () => {
    await truncateFixtures();
  });

  describe('create fixtures', () => {
    test('should response with fixtures', async () => {
      const data: Fixtures = {
        tournament_name: 'BRI League',
        match_datetime: new Date('2023-01-10T15:00:00Z'),
      } as Fixtures;
      const res = await request(app)
        .post(`/admin/fixtures`)
        .auth('admin', 'supersecretauth')
        .send(data);
      expect(res.status).toBe(201);
      expect(res.body.tournament_name).toBe(data.tournament_name);
      expect(res.body.match_datetime).toBe(JSON.parse(JSON.stringify(data.match_datetime)));
    });
  });
});
