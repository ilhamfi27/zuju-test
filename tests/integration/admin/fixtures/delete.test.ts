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

describe('DELETE /admin/fixtures/:fixture_id', () => {
  beforeAll(async () => {
    await truncateFixtures();
    await seedFixtures();
  });

  afterAll(async () => {
    await truncateFixtures();
  });

  describe('delete fixtures', () => {
    test('should response with fixtures', async () => {
      const res = await request(app)
        .delete(`/admin/fixtures/${fixtureExamples[10].id}`)
        .auth('admin', 'supersecretauth')
      expect(res.status).toBe(202);
    });
  });
});
