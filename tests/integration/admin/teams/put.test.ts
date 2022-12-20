import request from 'supertest';
import {
  Fixtures,
  FixturesByDate,
  FixturesQueryParam,
} from '../../../../src/interfaces/fixtures';
import { Teams } from '../../../../src/interfaces/teams';
import { app } from '../../../app';
import {
  fixtureExamples,
  seedFixtures,
  truncateFixtures,
} from '../../../fixtures/fixtures';
import {
  seedTeams,
  teamExamples,
  truncateTeams,
} from '../../../fixtures/teams';

describe('PUT /admin/fixtures/:fixture_id/side/:team_side', () => {
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

  describe('update fixtures', () => {
    test('should response with away teams', async () => {
      const teams = teamExamples.filter(
        (d) => d.fixture_id === fixtureExamples[11].id
      );
      const data: Teams = {
        name: 'Persib Bandung',
        team_logo: 'https://via.placeholder.com/120.png?text=Persib+Bandung',
        ...teams[1],
      } as Teams;
      const res = await request(app)
        .put(`/admin/fixtures/${fixtureExamples[11].id}/side/away`)
        .auth('admin', 'supersecretauth')
        .send(data);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(data.name);
      expect(res.body.code).toBe(data.code);
      expect(res.body.team_side).toBe('AWAY');
    });

    test('should response with home teams', async () => {
      const teams = teamExamples.filter(
        (d) => d.fixture_id === fixtureExamples[11].id
      );
      const data: Teams = {
        name: 'Persija Jakarta',
        team_logo: 'https://via.placeholder.com/120.png?text=Persija+Jakarta',
        ...teams[0],
      } as Teams;
      const res = await request(app)
        .put(`/admin/fixtures/${fixtureExamples[11].id}/side/home`)
        .auth('admin', 'supersecretauth')
        .send(data);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(data.name);
      expect(res.body.code).toBe(data.code);
      expect(res.body.team_side).toBe('HOME');
    });
  });
});
