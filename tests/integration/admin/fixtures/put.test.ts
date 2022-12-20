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

describe('PUT /admin/fixtures/:fixture_id', () => {
  beforeAll(async () => {
    await truncateFixtures();
    await seedFixtures();
  });

  afterAll(async () => {
    await truncateFixtures();
  });

  describe('update fixtures', () => {
    test('should response with fixtures', async () => {
      const data: Fixtures = {
        tournament_name: 'BCA League',
        match_datetime: new Date(fixtureExamples[10].match_datetime),
      } as Fixtures;
      const res = await request(app)
        .put(`/admin/fixtures/${fixtureExamples[10].id}`)
        .auth('admin', 'supersecretauth')
        .send(data);
      expect(res.status).toBe(200);
      expect(res.body.tournament_name).toBe(data.tournament_name);
      expect(res.body.match_datetime).toBe(JSON.parse(JSON.stringify(data.match_datetime)));
    });
  });
});
