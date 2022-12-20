import request from 'supertest';
import { app } from '../../../app';
import {
  fixtureExamples,
  seedFixtures,
  truncateFixtures,
} from '../../../fixtures/fixtures';
import { seedTeams, teamExamples, truncateTeams } from '../../../fixtures/teams';

describe('GET /admin/fixtures/:fixture_id/teams', () => {
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

  describe('get fixtures', () => {
    test('should response with fixtures', async () => {
      const res = await request(app)
        .get(`/admin/fixtures/${fixtureExamples[10].id}/teams`)
        .auth('admin', 'supersecretauth');
      const team = teamExamples.filter(d => d.fixture_id === fixtureExamples[10].id)
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].fixture_id).toBe(team[0].fixture_id);
      expect(res.body[1].fixture_id).toBe(team[1].fixture_id);
    });
  });
});

describe('GET /admin/fixtures/:fixture_id/teams/:team_id', () => {
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

  describe('get fixtures', () => {
    test('should response with fixtures', async () => {
      const team = teamExamples.find(d => d.fixture_id === fixtureExamples[10].id)
      const res = await request(app)
        .get(`/admin/fixtures/${fixtureExamples[10].id}/teams/${team.id}`)
        .auth('admin', 'supersecretauth');
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(team.name);
      expect(res.body.code).toBe(team.code);
      expect(res.body.fixture_id).toBe(team.fixture_id);
    });
  });
});
