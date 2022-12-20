import FixturesDomain from './fixtures/fixtures.domain';
import TeamsDomain from './teams/teams.domain';

export default class DomainManager {
  configProvider;
  constructor(configProvider) {
    this.configProvider = configProvider;
  }
  fixturesManager() {
    return new FixturesDomain(this.configProvider);
  }
  teamsManager() {
    return new TeamsDomain(this.configProvider);
  }
}
