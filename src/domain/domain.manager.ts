import { ConfigProviderInterface } from '../config/config.provider.interface';
import FixturesManager from '../interfaces/fixtures';
import TeamsManager from '../interfaces/teams';
import DomainManagerInterface from './domain.manager.interface';
import FixturesDomain from './fixtures/fixtures.domain';
import TeamsDomain from './teams/teams.domain';

export default class DomainManager implements DomainManagerInterface {
  configProvider: ConfigProviderInterface;
  constructor(configProvider: ConfigProviderInterface) {
    this.configProvider = configProvider;
  }
  fixturesManager(): FixturesManager {
    return new FixturesDomain(this.configProvider);
  }
  teamsManager(): TeamsManager {
    return new TeamsDomain(this.configProvider);
  }
}
