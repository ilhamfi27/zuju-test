import request from 'supertest';
import { app } from '../../../app';
import {
  fixtureExamples,
  seedFixtures,
  truncateFixtures,
} from '../../../fixtures/fixtures';

describe('GET /admin/fixtures/:fixture_id', () => {
  beforeAll(async () => {
    await truncateFixtures();
    await seedFixtures();
  });

  afterAll(async () => {
    await truncateFixtures();
  });

  describe('get fixtures', () => {
    test('should be unauthorized', async () => {
      const res = await request(app)
        .get(`/admin/fixtures/${fixtureExamples[10].id}`)
      expect(res.status).toBe(401);
    });

    test('should response with specific fixture', async () => {
      const res = await request(app)
        .get(`/admin/fixtures/${fixtureExamples[10].id}`)
        .auth('admin', 'supersecretauth')
      expect(res.status).toBe(200);
      expect(res.body.tournament_name).toBe(fixtureExamples[10].tournament_name);
      expect(res.body.match_datetime).toBe(JSON.parse(JSON.stringify(fixtureExamples[10].match_datetime)));
    });
  });
});
