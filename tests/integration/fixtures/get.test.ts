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
      expect(res.body.data.length).toBe(10);
      expect(res.body.pagination).toBeDefined();
      expect(res.body.pagination.total_size).toBe(15);
    });
    test('should response with custom page size', async () => {
      const res = await request(app).get(`/fixtures?size=30`);
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.length).toBe(15);
      expect(res.body.pagination.page).toBe(1);
    });
    test('should response in page 1 number with 30 size', async () => {
      const res = await request(app).get(`/fixtures?size=30&page=1`);
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.length).toBe(15);
      expect(res.body.pagination.page).toBe(1);
    });
    test('should response still in page 1 and 30 per page', async () => {
      const res = await request(app).get(`/fixtures?size=30&page=2`);
      expect(res.status).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.length).toBe(0);
      expect(res.body.pagination.page).toBe(2);
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
