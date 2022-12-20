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

    describe('.get()', () => {
      test('get one fixtures', async () => {
        getMock.mockReturnValue(Promise.resolve(fixtureExamples[0]));
        const team = teamExamples.find(d => d.fixture_id === fixtureExamples[0].id)
        const res = await teamDomain.get(context, fixtureExamples[0].id, team.id);
        expect(getMock).toBeCalled();
        expect(res.id).toBe(fixtureExamples[0].id);
      });
    });

    describe('.update()', () => {
      test('update team if exists', async () => {
        const data = { ...teamExamples[1], team_logo: '/canada-logo.png' };
        const existingFixture = fixtureExamples.find(d => d.id === teamExamples[1].fixture_id)
        getByCompetitionMock.mockReturnValue(Promise.resolve(teamExamples[1]))
        updateMock.mockReturnValue(Promise.resolve(data));

        const res = await teamDomain.createOrUpdate(
          context,
          existingFixture.id,
          data
        );
        expect(updateMock).toBeCalled();
        expect(res.id).toBe(teamExamples[1].id);
      });

      test('create team if not exists', async () => {
        const data = { ...teamExamples[10], team_logo: '/canada-logo.png' };
        const existingFixture = fixtureExamples.find(d => d.id === teamExamples[10].fixture_id)
        getByCompetitionMock.mockReturnValue(Promise.reject('not found'))
        createMock.mockReturnValue(Promise.resolve(data));

        const res = await teamDomain.createOrUpdate(
          context,
          existingFixture.id,
          data
        );
        
        expect(createMock).toBeCalled();
        expect(res.id).toBe(teamExamples[10].id);
      });
    });
  });
});
