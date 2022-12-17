import FixturesManager from "../interfaces/fixtures";
import HelloManager from "../interfaces/hello";

export default interface DomainManagerInterface {
  helloManager(): HelloManager
  fixturesManager(): FixturesManager
}