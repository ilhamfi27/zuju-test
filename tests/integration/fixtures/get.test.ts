import request from 'supertest';
import { app } from '../../app';
import { seedFixtures, truncateFixtures } from '../../fixtures/fixtures';
import { seedTeams, truncateTeams } from '../../fixtures/teams';

describe('GET /fixtures', () => {
  beforeAll(async () => {
    await truncateTeams();
    await truncateFixtures();
    await seedFixtures();
    await seedTeams();
  });

  afterAll(async () => {
    await truncateFixtures();
    await truncateTeams();
  });

  describe('get all fixtures and details with teams', () => {
    test('should response with fixtures and teams', async () => {
      const res = await request(app).get(`/fixtures`);
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.total_size).toBe(15);
    });
  });
});

describe('GET /fixtures/calendar', () => {
  beforeAll(async () => {
    await truncateTeams();
    await truncateFixtures();
    await seedFixtures();
    await seedTeams();
  });

  afterAll(async () => {
    await truncateFixtures();
    await truncateTeams();
  });

  describe('get fixtures calendar', () => {
    test('should response with fixtures group by calendar', async () => {
      const res = await request(app).get(`/fixtures/calendar`);
      expect(res.status).toBe(200);
    });
  });
});
