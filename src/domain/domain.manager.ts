import { ConfigProviderInterface } from "../config/config.provider.interface";
import FixturesManager from "../interfaces/fixtures";
import hello from "../interfaces/hello";
import DomainManagerInterface from "./domain.manager.interface";
import FixturesDomain from "./fixtures/fixtures.domain";
import HelloDomain from "./hello/hello.domain";

export default class DomainManager implements DomainManagerInterface {
  configProvider: ConfigProviderInterface
  constructor(configProvider: ConfigProviderInterface) {
    this.configProvider = configProvider
  }
  helloManager(): hello {
    return new HelloDomain(this.configProvider)
  }
  fixturesManager(): FixturesManager {
    return new FixturesDomain(this.configProvider)
  }
}