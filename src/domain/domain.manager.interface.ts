import FixturesManager from "../interfaces/fixtures";
import TeamsManager from "../interfaces/teams";

export default interface DomainManagerInterface {
  fixturesManager(): FixturesManager
  teamsManager(): TeamsManager
}