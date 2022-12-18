import { seedFixtures } from '../../tests/fixtures/fixtures';
import { seedTeams } from '../../tests/fixtures/teams';

export const seed = async () => {
  await seedFixtures();
  await seedTeams();
};
