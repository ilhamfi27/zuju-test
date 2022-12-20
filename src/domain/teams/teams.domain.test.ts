import { fixtureExamples } from '../../../tests/fixtures/fixtures';
import { teamExamples } from '../../../tests/fixtures/teams';
import { ConfigProvider } from '../../config/config.provider';
import Context from '../../context';
import TeamsStorageProvider from '../../infrastructure/sql/teams/teams.provider';
import TeamsDomain from './teams.domain';

const createMock = jest.fn(),
  getAllMock = jest.fn(),
  getMock = jest.fn(),
  updateMock = jest.fn(),
  deleteMock = jest.fn(),
  getByCompetitionMock = jest.fn();

TeamsStorageProvider.prototype.create = createMock;
TeamsStorageProvider.prototype.getAll = getAllMock;
TeamsStorageProvider.prototype.get = getMock;
TeamsStorageProvider.prototype.update = updateMock;
TeamsStorageProvider.prototype.delete = deleteMock;
TeamsStorageProvider.prototype.getByCompetition = getByCompetitionMock;

const configProvider = new ConfigProvider();
const teamDomain = new TeamsDomain(configProvider);
const context = new Context({ span: null });

describe('src/domain/team/team.domain.ts', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('class TeamsDomain', () => {
    describe('.getAll()', () => {
      test('getAll teams', async () => {
        getAllMock.mockReturnValue(
          Promise.resolve(teamExamples.filter(d => d.fixture_id === fixtureExamples[0].id))
        );

        const res = await teamDomain.getAll(context, fixtureExamples[0].id);
        expect(getAllMock).toBeCalled();
        expect(res.length).toBe(2);
      });
    });
  });
});
