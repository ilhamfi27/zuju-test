import { fixtureExamples } from '../../../tests/fixtures/fixtures';
import { ConfigProvider } from '../../config/config.provider';
import Context from '../../context';
import FixturesStorageProvider from '../../infrastructure/sql/fixtures/fixtures.provider';
import FixturesDomain from './fixtures.domain';

const createMock = jest.fn(),
  getAllMock = jest.fn(),
  getAllByDateMock = jest.fn(),
  getMock = jest.fn(),
  updateMock = jest.fn(),
  deleteMock = jest.fn();

FixturesStorageProvider.prototype.create = createMock;
FixturesStorageProvider.prototype.getAll = getAllMock;
FixturesStorageProvider.prototype.getAllByDate = getAllByDateMock;
FixturesStorageProvider.prototype.get = getMock;
FixturesStorageProvider.prototype.update = updateMock;
FixturesStorageProvider.prototype.delete = deleteMock;

const configProvider = new ConfigProvider();
const fixtureDomain = new FixturesDomain(configProvider);
const context = new Context({ span: null });

describe('src/domain/fixture/fixture.domain.ts', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('class FixtureDomain', () => {
    describe('.getAll()', () => {
      test('getAll fixtures', async () => {
        getAllMock.mockReturnValue(Promise.resolve({ data: fixtureExamples }));

        const res = await fixtureDomain.getAll(context, {
          pagination: { size: 100, page: 1 },
        });
        expect(getAllMock).toBeCalled();
        expect(res.data.length).toBe(15);
      });
    });

    describe('.getAllByDate()', () => {
      test('getAllByDate fixtures', async () => {
        getAllByDateMock.mockReturnValue(Promise.resolve(fixtureExamples));

        const res = await fixtureDomain.getAllByDate(context);
        expect(getAllByDateMock).toBeCalled();
        expect(res.length).toBe(15);
      });
    });

    describe('.get()', () => {
      test('get one fixtures', async () => {
        getMock.mockReturnValue(Promise.resolve(fixtureExamples[0]));

        const res = await fixtureDomain.get(context, fixtureExamples[0].uuid);
        expect(getMock).toBeCalled();
        expect(res.uuid).toBe(fixtureExamples[0].uuid);
      });
    });

    describe('.create()', () => {
      test('create fixture', async () => {
        const data = { ...fixtureExamples[0], name: 'Ultra Fixture' };
        createMock.mockReturnValue(Promise.resolve(data));

        const res = await fixtureDomain.create(context, data);
        expect(createMock).toBeCalled();
        expect(res.uuid).toBe(data.uuid);
      });
    });

    describe('.update()', () => {
      test('update fixture', async () => {
        const data = { ...fixtureExamples[1], name: 'Bussiness Fixture' };
        updateMock.mockReturnValue(Promise.resolve(data));

        const res = await fixtureDomain.update(
          context,
          fixtureExamples[1].uuid,
          data
        );
        expect(updateMock).toBeCalled();
        expect(res.uuid).toBe(fixtureExamples[1].uuid);
      });
    });

    describe('.delete()', () => {
      test('remove fixture', async () => {
        getMock.mockReturnValue(Promise.resolve(fixtureExamples[0]));
        deleteMock.mockReturnValue(Promise.resolve(undefined));
        await fixtureDomain.delete(context, fixtureExamples[0].uuid);
        expect(getMock).toBeCalled();
        expect(deleteMock).toBeCalled();
      });
    });
  });
});
